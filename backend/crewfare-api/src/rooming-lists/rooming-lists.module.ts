import { Module } from '@nestjs/common';
import { RoomingListsService } from './rooming-lists.service';
import { RoomingListsController } from './rooming-lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingList } from './entities/rooming-list.entity';
import { RoomingListBooking } from '../rooming-list-bookings/entities/rooming-list-booking.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoomingList, RoomingListBooking, Booking])],
  controllers: [RoomingListsController],
  providers: [RoomingListsService, DataSource],
})
export class RoomingListsModule {}
