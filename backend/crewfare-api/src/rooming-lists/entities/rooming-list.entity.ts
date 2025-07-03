import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rooming_lists')
export class RoomingList {
  @PrimaryGeneratedColumn()
  rooming_list_id: number;

  @Column()
  event_id: number;

  @Column()
  hotel_id: number;

  @Column()
  rfp_name: string;

  @Column()
  cut_off_date: Date;

  @Column()
  status: string;

  @Column()
  agreement_type: string;
}
