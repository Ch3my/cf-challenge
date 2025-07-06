import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private dataSource: DataSource,
  ) {}

  create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = this.bookingsRepository.create(createBookingDto);
    return this.bookingsRepository.save(booking);
  }

  findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find();
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingsRepository.findOneBy({ booking_id: id });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);
    Object.assign(booking, updateBookingDto);
    return this.bookingsRepository.save(booking);
  }

  async remove(id: number): Promise<void> {
    const result = await this.bookingsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
  }

  async importAll(createBookingDtos: CreateBookingDto[]): Promise<Booking[]> {
    await this.bookingsRepository.clear(); // Clear existing data
    const bookings = this.bookingsRepository.create(createBookingDtos);
    return this.bookingsRepository.save(bookings);
  }
}
