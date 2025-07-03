export class CreateBookingDto {
  hotel_id: number;
  event_id: number;
  guest_name: string;
  guest_phone_number: string;
  check_in_date: Date;
  check_out_date: Date;
}
