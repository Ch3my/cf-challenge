import axios from 'axios';
// import useStore from "../stores/UseStore"
import bookings from "../data/bookings.json"
import roomingListBookings from "../data/rooming-list-bookings.json"
import roomingList from "../data/rooming-lists.json"

const API_BASE_URL: string = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_URL is not defined in the environment variables.");
}

interface LoginResponseData {
    access_token: string;
}

interface Booking {
  booking_id: number;
  hotel_id: number;
  event_id: number;
  guest_name: string;
  guest_phone_number: string;
  check_in_date: string;
  check_out_date: string;
}

interface RoomingListBooking {
  rooming_list_id: number;
  booking_id: number;
}

interface RoomingList {
  rooming_list_id: number;
  event_id: number;
  event_name: string;
  hotel_id: number;
  rfp_name: string;
  cut_off_date: string;
  status: string;
  agreement_type: string;
}


const login = async () => {
    const dummyUser = { username: "username", password: "password" }
    try {
        const response = await axios.post<LoginResponseData>(`${API_BASE_URL}/auth/login`, dummyUser)
        return response.data.access_token
    } catch (error) {
        console.error("An entirely unknown error occurred:", error);
        throw new Error("An unknown error occurred during login.");
    }
}

const fetchRoomingLists = async (): Promise<RoomingList[]> => {
    const apiToken = await login()
    try {
        const response = await axios.get<RoomingList[]>(`${API_BASE_URL}/rooming-lists`, {
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}
const fetchRoomingListsBookings = async (): Promise<RoomingListBooking[]> => {
    const apiToken = await login()
    try {
        const response = await axios.get<RoomingListBooking[]>(`${API_BASE_URL}/rooming-list-bookings`, {
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}
const fetchBookings = async (): Promise<Booking[]> => {
    const apiToken = await login()
    try {
        const response = await axios.get<Booking[]>(`${API_BASE_URL}/bookings`, {
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}

const fetchBookingsByRoomingListId = async (roomingListId: number): Promise<Booking[]> => {
    const apiToken = await login();
    try {
        const response = await axios.get<Booking[]>(`${API_BASE_URL}/rooming-lists/${roomingListId}/bookings`, {
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching bookings for rooming list ${roomingListId}:`, error);
        return [];
    }
};

const fetchAndMixData = async () => {
  const roomingLists = await fetchRoomingLists();
  const roomingListsBookings = await fetchRoomingListsBookings();
  const bookings = await fetchBookings();

  // 1. Build maps for fast lookup
  const eventMap = new Map<number, string>();
  const roomingListMap = new Map<number, typeof roomingLists[0][]>();
  const roomingListBookingMap = new Map<number, number[]>();
  const bookingMap = new Map<number, typeof bookings[0]>();

  // 2. Fill event map and group rooming lists by event_id
  for (const list of roomingLists) {
    eventMap.set(list.event_id, list.event_name);

    if (!roomingListMap.has(list.event_id)) {
      roomingListMap.set(list.event_id, []);
    }
    roomingListMap.get(list.event_id)!.push(list);
  }

  // 3. Map rooming_list_id to booking_ids
  for (const rlb of roomingListsBookings) {
    if (!roomingListBookingMap.has(rlb.rooming_list_id)) {
      roomingListBookingMap.set(rlb.rooming_list_id, []);
    }
    roomingListBookingMap.get(rlb.rooming_list_id)!.push(rlb.booking_id);
  }

  // 4. Map booking_id to booking object
  for (const booking of bookings) {
    bookingMap.set(booking.booking_id, booking);
  }

  // 5. Create enriched event list
  const enrichedEvents = Array.from(eventMap.entries()).map(([event_id, event_name]) => {
    const lists = roomingListMap.get(event_id) || [];

    const rooming_lists = lists.map((list) => {
      const bookingIds = roomingListBookingMap.get(list.rooming_list_id) || [];
      const actualBookings = bookingIds.map((id) => bookingMap.get(id)).filter(Boolean);

      const checkInDates = actualBookings.map((b) => new Date(b!.check_in_date));
      const checkOutDates = actualBookings.map((b) => new Date(b!.check_out_date));

      const earliestCheckIn = checkInDates.length
        ? new Date(Math.min(...checkInDates.map((d) => d.getTime())))
        : null;
      const latestCheckOut = checkOutDates.length
        ? new Date(Math.max(...checkOutDates.map((d) => d.getTime())))
        : null;

      return {
        ...list,
        bookings_count: actualBookings.length,
        earliest_check_in: earliestCheckIn?.toISOString().split("T")[0] ?? null,
        latest_check_out: latestCheckOut?.toISOString().split("T")[0] ?? null,
      };
    });

    return { event_id, event_name, rooming_lists };
  });

  return enrichedEvents;
};


const importData = async (): Promise<{ success: boolean; error?: string }> => {
    try {
        const transformedBookings = bookings.map((booking: any) => ({
            booking_id:booking.bookingId,
            hotel_id: booking.hotelId,
            event_id: booking.eventId,
            guest_name: booking.guestName,
            guest_phone_number: booking.guestPhoneNumber,
            check_in_date: booking.checkInDate,
            check_out_date: booking.checkOutDate,
        }));

        const transformedRoomingListBookings = roomingListBookings.map((o: any) => ({
            rooming_list_id: o.roomingListId,
            booking_id: o.bookingId,
        }));

        const transformedRoomingList = roomingList.map((o: any) => ({
            rooming_list_id: o.roomingListId,
            event_id: o.eventId,
            hotel_id: o.hotelId,
            event_name: o.eventName,
            rfp_name: o.rfpName,
            cut_off_date: o.cutOffDate,
            status: o.status,
            agreement_type: o.agreement_type,
        }));

        const apiToken = await login();

        await axios.post(`${API_BASE_URL}/bookings/import`, transformedBookings, {
            headers: { 'Authorization': `Bearer ${apiToken}` },
        });

        await axios.post(`${API_BASE_URL}/rooming-list-bookings/import`, transformedRoomingListBookings, {
            headers: { 'Authorization': `Bearer ${apiToken}` },
        });

        await axios.post(`${API_BASE_URL}/rooming-lists/import`, transformedRoomingList, {
            headers: { 'Authorization': `Bearer ${apiToken}` },
        });

        return { success: true };
    } catch (error: any) {
        console.error("Import failed:", error?.message || error);
        return {
            success: false,
            error: error?.message || 'Unknown error occurred during import',
        };
    }
};

export { login, fetchRoomingLists, importData, fetchAndMixData, fetchBookingsByRoomingListId }