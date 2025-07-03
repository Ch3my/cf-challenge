import { Test, TestingModule } from '@nestjs/testing';
import { RoomingListBookingsService } from '@src/rooming-list-bookings/rooming-list-bookings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoomingListBooking } from '@src/rooming-list-bookings/entities/rooming-list-booking.entity';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('RoomingListBookingsService', () => {
  let service: RoomingListBookingsService;
  let repository: Repository<RoomingListBooking>;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomingListBookingsService,
        {
          provide: getRepositoryToken(RoomingListBooking),
          useClass: Repository,
        },
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RoomingListBookingsService>(RoomingListBookingsService);
    repository = module.get<Repository<RoomingListBooking>>(getRepositoryToken(RoomingListBooking));
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a rooming list booking', async () => {
      const createRoomingListBookingDto = { rooming_list_id: 1, booking_id: 1 };
      const expectedRoomingListBooking = { rooming_list_booking_id: 1, ...createRoomingListBookingDto };

      jest.spyOn(repository, 'create').mockReturnValue(expectedRoomingListBooking as RoomingListBooking);
      jest.spyOn(repository, 'save').mockResolvedValue(expectedRoomingListBooking);

      const result = await service.create(createRoomingListBookingDto);
      expect(result).toEqual(expectedRoomingListBooking);
      expect(repository.create).toHaveBeenCalledWith(createRoomingListBookingDto);
      expect(repository.save).toHaveBeenCalledWith(expectedRoomingListBooking);
    });
  });

  describe('findAll', () => {
    it('should return an array of rooming list bookings', async () => {
      const expectedRoomingListBookings = [{ rooming_list_booking_id: 1, rooming_list_id: 1, booking_id: 1 }];
      jest.spyOn(repository, 'find').mockResolvedValue(expectedRoomingListBookings as RoomingListBooking[]);

      const result = await service.findAll();
      expect(result).toEqual(expectedRoomingListBookings);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single rooming list booking', async () => {
      const expectedRoomingListBooking = { rooming_list_booking_id: 1, rooming_list_id: 1, booking_id: 1 };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(expectedRoomingListBooking as RoomingListBooking);

      const result = await service.findOne(1);
      expect(result).toEqual(expectedRoomingListBooking);
      expect(repository.findOneBy).toHaveBeenCalledWith({ rooming_list_booking_id: 1 });
    });

    it('should throw NotFoundException if rooming list booking not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a rooming list booking', async () => {
      const existingRoomingListBooking = { rooming_list_booking_id: 1, rooming_list_id: 1, booking_id: 1 };
      const updateRoomingListBookingDto = { booking_id: 2 };
      const expectedRoomingListBooking = { ...existingRoomingListBooking, ...updateRoomingListBookingDto };

      jest.spyOn(service, 'findOne').mockResolvedValue(existingRoomingListBooking as RoomingListBooking);
      jest.spyOn(repository, 'save').mockResolvedValue(expectedRoomingListBooking as RoomingListBooking);

      const result = await service.update(1, updateRoomingListBookingDto);
      expect(result).toEqual(expectedRoomingListBooking);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(repository.save).toHaveBeenCalledWith(expectedRoomingListBooking);
    });
  });

  describe('remove', () => {
    it('should remove a rooming list booking', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if rooming list booking not found for removal', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('importAll', () => {
    it('should clear existing data and import new rooming list bookings', async () => {
      const createRoomingListBookingDtos = [
        { rooming_list_id: 1, booking_id: 1 },
        { rooming_list_id: 2, booking_id: 2 },
      ];
      const expectedRoomingListBookings = createRoomingListBookingDtos.map((dto, index) => ({ rooming_list_booking_id: index + 1, ...dto }));

      jest.spyOn(repository, 'clear').mockResolvedValue(undefined);
      jest.spyOn(repository, 'create').mockReturnValue(expectedRoomingListBookings as any);
      jest.spyOn(repository, 'save').mockResolvedValue(expectedRoomingListBookings as any);

      const result = await service.importAll(createRoomingListBookingDtos);
      expect(repository.clear).toHaveBeenCalled();
      expect(repository.create).toHaveBeenCalledWith(createRoomingListBookingDtos);
      expect(repository.save).toHaveBeenCalledWith(expectedRoomingListBookings);
      expect(result).toEqual(expectedRoomingListBookings);
    });
  });
});
