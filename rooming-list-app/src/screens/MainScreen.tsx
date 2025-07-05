import { useEffect, useState, useCallback, useMemo } from "react";
import Filters from "../components/Filters";
import SearchInputWithDebounce from "../components/SearchInput";
import { fetchAndMixData } from "../lib/api";
import ImportBtn from "../components/ImportBtn";
import EventCard from "../components/EventCard";
import useStore from "../stores/UseStore";
import SortControl from "../components/SortControl";

const MainScreen = () => {
    const [data, setData] = useState<any>([]);
    const searchTerm = useStore((state) => state.searchTerm);
    const activeFilters = useStore((state) => state.activeFilters);
    const sortOption = useStore((state) => state.sortOption);

    // Reusable fetch function
    const loadData = useCallback(async () => {
        const info = await fetchAndMixData();
        setData(info); // Set the data here
    }, []);

    useEffect(() => {
        loadData(); // Initial fetch
    }, [loadData]);

    // Callback passed to ImportBtn
    const handleImportDone = (success: boolean) => {
        if (success) {
            loadData(); // Re-fetch if import was successful
        }
    };

    const filteredAndSortedData = useMemo(() => {
        let currentData = data;

        // Apply search filter
        if (searchTerm) {
            currentData = currentData.map((event: any) => ({
                ...event,
                rooming_lists: event.rooming_lists.filter((roomingList: any) => {
                    const lowerCaseSearchTerm = searchTerm.toLowerCase();
                    return (
                        (roomingList.event_name || '').toLowerCase().includes(lowerCaseSearchTerm) ||
                        (roomingList.rfp_name || '').toLowerCase().includes(lowerCaseSearchTerm) ||
                        (roomingList.agreement_type || '').toLowerCase().includes(lowerCaseSearchTerm)
                    );
                }),
            }));
        }

        // Apply status filters
        const selectedStatuses = Object.keys(activeFilters).filter(
            (key) => activeFilters[key as keyof typeof activeFilters]
        );

        if (selectedStatuses.length > 0) {
            currentData = currentData.map((event: any) => ({
                ...event,
                rooming_lists: event.rooming_lists.filter((roomingList: any) => {
                    const statusMap: { [key: string]: string } = {
                        received: "active",
                        completed: "closed",
                        archived: "canceled",
                        // active: "received",
                        // closed: "completed",
                        // canceled: "archived",
                    };
                    const mappedStatus = statusMap[roomingList.status.toLowerCase()] || roomingList.status.toLowerCase();
                    return selectedStatuses.includes(mappedStatus);
                }),
            }));
        }

        // Apply sorting
        currentData = currentData.map((event: any) => ({
            ...event,
            rooming_lists: [...event.rooming_lists].sort((a, b) => {
                const dateA = new Date(a.cut_off_date).getTime();
                const dateB = new Date(b.cut_off_date).getTime();

                if (sortOption.direction === 'asc') {
                    return dateA - dateB;
                } else {
                    return dateB - dateA;
                }
            }),
        }));

        return currentData;
    }, [data, searchTerm, activeFilters, sortOption]);

    return (
        <div className="bg-gray-50">
            <div className="p-4 container mx-auto flex flex-col gap-6">
                <h1 className="text-3xl font-bold">Rooming List Management: Events</h1>
                <div className="flex flex-col lg:flex-row gap-4">
                    <SearchInputWithDebounce />
                    <Filters />
                    <SortControl />
                    <ImportBtn onImportDone={handleImportDone} />
                </div>
                {filteredAndSortedData.map((event: any) => (
                    <div key={event.event_id}>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="flex-1 h-px bg-gradient-to-l from-teal-400/50 to-transparent" />
                            <div className="px-3 py-1 border border-teal-400 text-teal-600 font-semibold rounded-md bg-teal-50">
                                {event.event_name}
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-r from-teal-400/50 to-transparent" />
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {event.rooming_lists.map((o: any) => (
                                <div key={o.rooming_list_id}>
                                    <EventCard
                                        rfp_name={o.rfp_name}
                                        cut_off_date={o.cut_off_date}
                                        status={o.status}
                                        agreement_type={o.agreement_type}
                                        booking_count={o.bookings_count}
                                        event_start={o.earliest_check_in}
                                        event_end={o.latest_check_out}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainScreen;
