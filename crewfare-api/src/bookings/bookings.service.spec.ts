import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from '@src/bookings/bookings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from '@src/bookings/entities/booking.entity';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('BookingsService', () => {
  let service: BookingsService;
  let repository: Repository<Booking>;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: getRepositoryToken(Booking),
          useClass: Repository,
        },
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    repository = module.get<Repository<Booking>>(getRepositoryToken(Booking));
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a booking', async () => {
      const createBookingDto = { hotel_id: 1, event_id: 1, guest_name: 'Test Guest', guest_phone_number: '123', check_in_date: new Date(), check_out_date: new Date() };
      const expectedBooking = { booking_id: 1, ...createBookingDto };

      jest.spyOn(repository, 'create').mockReturnValue(expectedBooking as Booking);
      jest.spyOn(repository, 'save').mockResolvedValue(expectedBooking);

      const result = await service.create(createBookingDto);
      expect(result).toEqual(expectedBooking);
      expect(repository.create).toHaveBeenCalledWith(createBookingDto);
      expect(repository.save).toHaveBeenCalledWith(expectedBooking);
    });
  });

  describe('findAll', () => {
    it('should return an array of bookings', async () => {
      const expectedBookings = [{ booking_id: 1, hotel_id: 1, event_id: 1, guest_name: 'Test Guest', guest_phone_number: '123', check_in_date: new Date(), check_out_date: new Date() }];
      jest.spyOn(repository, 'find').mockResolvedValue(expectedBookings as Booking[]);

      const result = await service.findAll();
      expect(result).toEqual(expectedBookings);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single booking', async () => {
      const expectedBooking = { booking_id: 1, hotel_id: 1, event_id: 1, guest_name: 'Test Guest', guest_phone_number: '123', check_in_date: new Date(), check_out_date: new Date() };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(expectedBooking as Booking);

      const result = await service.findOne(1);
      expect(result).toEqual(expectedBooking);
      expect(repository.findOneBy).toHaveBeenCalledWith({ booking_id: 1 });
    });

    it('should throw NotFoundException if booking not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a booking', async () => {
      const existingBooking = { booking_id: 1, hotel_id: 1, event_id: 1, guest_name: 'Test Guest', guest_phone_number: '123', check_in_date: new Date(), check_out_date: new Date() };
      const updateBookingDto = { guest_name: 'Updated Guest' };
      const expectedBooking = { ...existingBooking, ...updateBookingDto };

      jest.spyOn(service, 'findOne').mockResolvedValue(existingBooking as Booking);
      jest.spyOn(repository, 'save').mockResolvedValue(expectedBooking as Booking);

      const result = await service.update(1, updateBookingDto);
      expect(result).toEqual(expectedBooking);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(repository.save).toHaveBeenCalledWith(expectedBooking);
    });
  });

  describe('remove', () => {
    it('should remove a booking', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if booking not found for removal', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('importAll', () => {
    it('should clear existing data and import new bookings', async () => {
      const createBookingDtos = [
        { hotel_id: 1, event_id: 1, guest_name: 'New Guest 1', guest_phone_number: '111', check_in_date: new Date(), check_out_date: new Date() },
        { hotel_id: 2, event_id: 2, guest_name: 'New Guest 2', guest_phone_number: '222', check_in_date: new Date(), check_out_date: new Date() },
      ];
      const expectedBookings = createBookingDtos.map((dto, index) => ({ booking_id: index + 1, ...dto }));

      jest.spyOn(repository, 'clear').mockResolvedValue(undefined);
      jest.spyOn(repository, 'create').mockReturnValue(expectedBookings as any);
      jest.spyOn(repository, 'save').mockResolvedValue(expectedBookings as any);

      const result = await service.importAll(createBookingDtos);
      expect(repository.clear).toHaveBeenCalled();
      expect(repository.create).toHaveBeenCalledWith(createBookingDtos);
      expect(repository.save).toHaveBeenCalledWith(expectedBookings);
      expect(result).toEqual(expectedBookings);
    });
  });
});
