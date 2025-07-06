import { useEffect, useState, useCallback, useMemo } from "react";
import Filters from "../components/Filters";
import SearchInputWithDebounce from "../components/SearchInput";
import { fetchAndMixData } from "../lib/api";
import ImportBtn from "../components/ImportBtn";
import EventCard from "../components/EventCard";
import useStore from "../stores/UseStore";
import SortControl from "../components/SortControl";
import EventTitle from "../components/EventTitle";
import CustomScrollContainer from "../components/CustomScrollContainer";

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

        // Filter out events that have no rooming lists after filtering
        currentData = currentData.filter((event: any) => event.rooming_lists.length > 0);

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
                {filteredAndSortedData.map((event: any, index: number) => (
                    <div key={event.event_id}>
                        <EventTitle eventName={event.event_name} colorIndex={index} />
                        <CustomScrollContainer className="pb-6">
                            {event.rooming_lists.map((o: any) => (
                                <div key={o.rooming_list_id}>
                                    <EventCard
                                        rooming_list_id={o.rooming_list_id}
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
                        </CustomScrollContainer>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainScreen;
