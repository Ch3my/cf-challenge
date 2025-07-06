import React from 'react';
import { Calendar, FileSearch } from 'lucide-react';
import { DateTime } from 'luxon';
import { fetchBookingsByRoomingListId } from '../lib/api';

type EventCardProps = {
    rooming_list_id: number;
    rfp_name: string;
    cut_off_date: string;
    status: string;
    agreement_type: string;
    booking_count?: number;
    event_start?: string; // optional: ISO date
    event_end?: string;   // optional: ISO date
};

const EventCard: React.FC<EventCardProps> = ({
    rooming_list_id,
    rfp_name,
    cut_off_date,
    agreement_type,
    booking_count = 0,
    event_start,
    event_end,
}) => {
    const cutOff = DateTime.fromISO(cut_off_date);
    const cutOffDay = cutOff.toFormat('d');
    const cutOffMonth = cutOff.toFormat('LLL').toUpperCase();

    const startDate = event_start ? DateTime.fromISO(event_start) : DateTime.local(2025, 1, 31);
    const endDate = event_end ? DateTime.fromISO(event_end) : DateTime.local(2025, 2, 2);
    const eventDates = `${startDate.toFormat('MMM d')} – ${endDate.toFormat('MMM d, yyyy')}`;

    const handleViewBookings = async () => {
        try {
            const bookings = await fetchBookingsByRoomingListId(rooming_list_id);
            console.log(`Bookings for Rooming List ${rooming_list_id}:`, bookings);
        } catch (error) {
            console.error(`Failed to fetch bookings for Rooming List ${rooming_list_id}:`, error);
        }
    };

    return (
        <div className="min-w-sm flex flex-col bg-white rounded-md p-4 border border-gray-200 gap-4">
            <div className="flex justify-between">
                <div>
                    <h2 className="font-bold text-lg text-gray-900">{rfp_name}</h2>
                    <span>Agreement:
                        <span className='ml-1 font-semibold capitalize'>{agreement_type}</span>
                    </span>
                </div>
                <div className='flex flex-col items-center'>
                    <div className="bg-blue-100 rounded-md text-center w-12">
                        <div className="text-xs py-0.5 text-blue-600 bg-blue-200 rounded-t-md font-semibold">{cutOffMonth}</div>
                        <div className="text-lg py-1 font-bold text-blue-600 leading-none">{cutOffDay}</div>
                    </div>
                    <span className='text-xs text-gray-500 mt-1'>Cut-Off Date</span>
                </div>
            </div>
            <div className="flex items-center text-gray-500 text-sm mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                {eventDates}
            </div>
            <div className='grid grid-cols-6 gap-2'>
                <button
                    onClick={handleViewBookings}
                    className=" col-span-5 bg-[#4323ff] hover:bg-[#3719e5] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center whitespace-nowrap"
                >
                    View Bookings ({booking_count})
                </button>
                <button className='flex items-center justify-center border-2 rounded-md border-[#4323ff] hover:bg-gray-50'>
                    <FileSearch color='#4323ff' />
                </button>
            </div>
        </div>
    );
};

export default EventCard;
