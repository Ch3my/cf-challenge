import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateRoomingListBookingDto } from './dto/create-rooming-list-booking.dto';
import { UpdateRoomingListBookingDto } from './dto/update-rooming-list-booking.dto';
import { RoomingListBooking } from './entities/rooming-list-booking.entity';

@Injectable()
export class RoomingListBookingsService {
  constructor(
    @InjectRepository(RoomingListBooking)
    private roomingListBookingsRepository: Repository<RoomingListBooking>,
    private dataSource: DataSource,
  ) {}

  create(createRoomingListBookingDto: CreateRoomingListBookingDto): Promise<RoomingListBooking> {
    const roomingListBooking = this.roomingListBookingsRepository.create(createRoomingListBookingDto);
    return this.roomingListBookingsRepository.save(roomingListBooking);
  }

  findAll(): Promise<RoomingListBooking[]> {
    return this.roomingListBookingsRepository.find();
  }

  async findOne(id: number): Promise<RoomingListBooking> {
    const roomingListBooking = await this.roomingListBookingsRepository.findOneBy({ rooming_list_booking_id: id });
    if (!roomingListBooking) {
      throw new NotFoundException(`Rooming list booking with ID ${id} not found`);
    }
    return roomingListBooking;
  }

  async update(id: number, updateRoomingListBookingDto: UpdateRoomingListBookingDto): Promise<RoomingListBooking> {
    const roomingListBooking = await this.findOne(id);
    Object.assign(roomingListBooking, updateRoomingListBookingDto);
    return this.roomingListBookingsRepository.save(roomingListBooking);
  }

  async remove(id: number): Promise<void> {
    const result = await this.roomingListBookingsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rooming list booking with ID ${id} not found`);
    }
  }

  async importAll(createRoomingListBookingDtos: CreateRoomingListBookingDto[]): Promise<RoomingListBooking[]> {
    await this.roomingListBookingsRepository.clear(); // Clear existing data
    const roomingListBookings = this.roomingListBookingsRepository.create(createRoomingListBookingDtos);
    return this.roomingListBookingsRepository.save(roomingListBookings);
  }
}
