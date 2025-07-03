export class CreateRoomingListDto {
  event_id: number;
  hotel_id: number;
  rfp_name: string;
  cut_off_date: Date;
  status: string;
  agreement_type: string;
}
