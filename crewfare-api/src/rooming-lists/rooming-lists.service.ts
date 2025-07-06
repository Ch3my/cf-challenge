import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateRoomingListDto } from './dto/create-rooming-list.dto';
import { UpdateRoomingListDto } from './dto/update-rooming-list.dto';
import { RoomingList } from './entities/rooming-list.entity';
import { RoomingListBooking } from '../rooming-list-bookings/entities/rooming-list-booking.entity';
import { Booking } from '../bookings/entities/booking.entity';

@Injectable()
export class RoomingListsService {
  constructor(
    @InjectRepository(RoomingList)
    private roomingListsRepository: Repository<RoomingList>,
    @InjectRepository(RoomingListBooking)
    private roomingListBookingsRepository: Repository<RoomingListBooking>,
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private dataSource: DataSource,
  ) {}

  create(createRoomingListDto: CreateRoomingListDto): Promise<RoomingList> {
    const roomingList = this.roomingListsRepository.create(createRoomingListDto);
    return this.roomingListsRepository.save(roomingList);
  }

  findAll(): Promise<RoomingList[]> {
    return this.roomingListsRepository.find();
  }

  async findOne(id: number): Promise<RoomingList> {
    const roomingList = await this.roomingListsRepository.findOneBy({ rooming_list_id: id });
    if (!roomingList) {
      throw new NotFoundException(`Rooming list with ID ${id} not found`);
    }
    return roomingList;
  }

  async update(id: number, updateRoomingListDto: UpdateRoomingListDto): Promise<RoomingList> {
    const roomingList = await this.findOne(id);
    Object.assign(roomingList, updateRoomingListDto);
    return this.roomingListsRepository.save(roomingList);
  }

  async remove(id: number): Promise<void> {
    const result = await this.roomingListsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rooming list with ID ${id} not found`);
    }
  }

  async importAll(createRoomingListDtos: CreateRoomingListDto[]): Promise<RoomingList[]> {
    await this.roomingListsRepository.clear(); // Clear existing data
    const roomingLists = this.roomingListsRepository.create(createRoomingListDtos);
    return this.roomingListsRepository.save(roomingLists);
  }

  async findBookingsByRoomingListId(roomingListId: number): Promise<Booking[]> {
    const roomingListBookings = await this.roomingListBookingsRepository.find({
      where: { rooming_list_id: roomingListId },
    });

    if (roomingListBookings.length === 0) {
      return [];
    }

    const bookingIds = roomingListBookings.map(rlb => rlb.booking_id);

    const bookings = await this.bookingsRepository.findByIds(bookingIds);

    return bookings;
  }
}
