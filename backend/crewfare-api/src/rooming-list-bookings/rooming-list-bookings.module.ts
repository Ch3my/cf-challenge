import { Module } from '@nestjs/common';
import { RoomingListBookingsService } from './rooming-list-bookings.service';
import { RoomingListBookingsController } from './rooming-list-bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingListBooking } from './entities/rooming-list-booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomingListBooking])],
  controllers: [RoomingListBookingsController],
  providers: [RoomingListBookingsService],
})
export class RoomingListBookingsModule {}
