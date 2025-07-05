import { useEffect, useState, useCallback } from "react";
import Filters from "../components/Filters";
import SearchInputWithDebounce from "../components/SearchInput";
import { fetchAndMixData } from "../lib/api";
import ImportBtn from "../components/ImportBtn";
import EventCard from "../components/EventCard";

const MainScreen = () => {
    const [data, setData] = useState<any>([]);

    // Reusable fetch function
    const loadData = useCallback(async () => {
        // const info = await fetchRoomingLists();
        const info = await fetchAndMixData()
        console.log(info)
        setData(info); // ✅ Set the data here
    }, []);

    useEffect(() => {
        loadData(); // ✅ Initial fetch
    }, [loadData]);

    // ✅ Callback passed to ImportBtn
    const handleImportDone = (success: boolean) => {
        if (success) {
            loadData(); // ✅ Re-fetch if import was successful
        }
    };

    return (
        <div className="bg-gray-50">
            <div className="p-4 container mx-auto flex flex-col gap-6">
                <h1 className="text-3xl font-bold">Rooming List Management: Events</h1>
                <div className="flex gap-4">
                    <SearchInputWithDebounce onSearch={() => { }} />
                    <Filters />
                    <ImportBtn onImportDone={handleImportDone} />
                </div>
                {data.map((event: any) => (
                    <div key={event.event_id}>
                        <div className="flex items-center justify-center gap-4 my-8">
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
