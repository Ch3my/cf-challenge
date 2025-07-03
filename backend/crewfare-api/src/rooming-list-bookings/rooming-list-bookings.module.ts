import { Module } from '@nestjs/common';
import { RoomingListBookingsService } from './rooming-list-bookings.service';
import { RoomingListBookingsController } from './rooming-list-bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingListBooking } from './entities/rooming-list-booking.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoomingListBooking])],
  controllers: [RoomingListBookingsController],
  providers: [RoomingListBookingsService, DataSource],
})
export class RoomingListBookingsModule {}
