import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bookings')
export class Booking {
  @Column({ primary: true })
  booking_id: number;

  @Column()
  hotel_id: number;

  @Column()
  event_id: number;

  @Column()
  guest_name: string;

  @Column()
  guest_phone_number: string;

  @Column()
  check_in_date: Date;

  @Column()
  check_out_date: Date;
}
