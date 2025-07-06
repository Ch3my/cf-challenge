import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rooming_list_bookings')
export class RoomingListBooking {
  @PrimaryGeneratedColumn()
  rooming_list_booking_id: number;

  @Column()
  rooming_list_id: number;

  @Column()
  booking_id: number;
}
