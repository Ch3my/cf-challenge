import { Test, TestingModule } from '@nestjs/testing';
import { RoomingListsService } from '@src/rooming-lists/rooming-lists.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoomingList } from '@src/rooming-lists/entities/rooming-list.entity';
import { RoomingListBooking } from '@src/rooming-list-bookings/entities/rooming-list-booking.entity';
import { Booking } from '@src/bookings/entities/booking.entity';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('RoomingListsService', () => {
  let service: RoomingListsService;
  let roomingListsRepository: Repository<RoomingList>;
  let roomingListBookingsRepository: Repository<RoomingListBooking>;
  let bookingsRepository: Repository<Booking>;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomingListsService,
        {
          provide: getRepositoryToken(RoomingList),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(RoomingListBooking),
          useClass: Repository,
        },
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

    service = module.get<RoomingListsService>(RoomingListsService);
    roomingListsRepository = module.get<Repository<RoomingList>>(getRepositoryToken(RoomingList));
    roomingListBookingsRepository = module.get<Repository<RoomingListBooking>>(getRepositoryToken(RoomingListBooking));
    bookingsRepository = module.get<Repository<Booking>>(getRepositoryToken(Booking));
    dataSource = module.get<DataSource>(DataSource);

    jest.spyOn(bookingsRepository, 'findByIds');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a rooming list', async () => {
      const createRoomingListDto = { event_id: 1, event_name: "Fun Event", hotel_id: 1, rfp_name: 'Test RFP', cut_off_date: new Date(), status: 'Open', agreement_type: 'Type A' };
      const expectedRoomingList = { rooming_list_id: 1, ...createRoomingListDto };

      jest.spyOn(roomingListsRepository, 'create').mockReturnValue(expectedRoomingList as RoomingList);
      jest.spyOn(roomingListsRepository, 'save').mockResolvedValue(expectedRoomingList);

      const result = await service.create(createRoomingListDto);
      expect(result).toEqual(expectedRoomingList);
      expect(roomingListsRepository.create).toHaveBeenCalledWith(createRoomingListDto);
      expect(roomingListsRepository.save).toHaveBeenCalledWith(expectedRoomingList);
    });
  });

  describe('findAll', () => {
    it('should return an array of rooming lists', async () => {
      const expectedRoomingLists = [{ rooming_list_id: 1, event_id: 1, hotel_id: 1, rfp_name: 'Test RFP', cut_off_date: new Date(), status: 'Open', agreement_type: 'Type A' }];
      jest.spyOn(roomingListsRepository, 'find').mockResolvedValue(expectedRoomingLists as RoomingList[]);

      const result = await service.findAll();
      expect(result).toEqual(expectedRoomingLists);
      expect(roomingListsRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single rooming list', async () => {
      const expectedRoomingList = { rooming_list_id: 1, event_id: 1, hotel_id: 1, rfp_name: 'Test RFP', cut_off_date: new Date(), status: 'Open', agreement_type: 'Type A' };
      jest.spyOn(roomingListsRepository, 'findOneBy').mockResolvedValue(expectedRoomingList as RoomingList);

      const result = await service.findOne(1);
      expect(result).toEqual(expectedRoomingList);
      expect(roomingListsRepository.findOneBy).toHaveBeenCalledWith({ rooming_list_id: 1 });
    });

    it('should throw NotFoundException if rooming list not found', async () => {
      jest.spyOn(roomingListsRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a rooming list', async () => {
      const existingRoomingList = { rooming_list_id: 1, event_id: 1, hotel_id: 1, rfp_name: 'Test RFP', cut_off_date: new Date(), status: 'Open', agreement_type: 'Type A' };
      const updateRoomingListDto = { rfp_name: 'Updated RFP' };
      const expectedRoomingList = { ...existingRoomingList, ...updateRoomingListDto };

      jest.spyOn(service, 'findOne').mockResolvedValue(existingRoomingList as RoomingList);
      jest.spyOn(roomingListsRepository, 'save').mockResolvedValue(expectedRoomingList as RoomingList);

      const result = await service.update(1, updateRoomingListDto);
      expect(result).toEqual(expectedRoomingList);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(roomingListsRepository.save).toHaveBeenCalledWith(expectedRoomingList);
    });
  });

  describe('remove', () => {
    it('should remove a rooming list', async () => {
      jest.spyOn(roomingListsRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

      await service.remove(1);
      expect(roomingListsRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if rooming list not found for removal', async () => {
      jest.spyOn(roomingListsRepository, 'delete').mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('importAll', () => {
    it('should clear existing data and import new rooming lists', async () => {
      const createRoomingListDtos = [
        { event_id: 1, event_name: "Fun Event", hotel_id: 1, rfp_name: 'New RFP 1', cut_off_date: new Date(), status: 'Open', agreement_type: 'Type A' },
        { event_id: 2, event_name: "Fun Event", hotel_id: 2, rfp_name: 'New RFP 2', cut_off_date: new Date(), status: 'Closed', agreement_type: 'Type B' },
      ];
      const expectedRoomingLists = createRoomingListDtos.map((dto, index) => ({ rooming_list_id: index + 1, ...dto }));

      jest.spyOn(roomingListsRepository, 'clear').mockResolvedValue(undefined);
      jest.spyOn(roomingListsRepository, 'create').mockReturnValue(expectedRoomingLists as any);
      jest.spyOn(roomingListsRepository, 'save').mockResolvedValue(expectedRoomingLists as any);

      const result = await service.importAll(createRoomingListDtos);
      expect(roomingListsRepository.clear).toHaveBeenCalled();
      expect(roomingListsRepository.create).toHaveBeenCalledWith(createRoomingListDtos);
      expect(roomingListsRepository.save).toHaveBeenCalledWith(expectedRoomingLists);
      expect(result).toEqual(expectedRoomingLists);
    });
  });

  describe('findBookingsByRoomingListId', () => {
    it('should return an array of bookings for a given rooming list ID', async () => {
      const roomingListId = 1;
      const mockRoomingListBookings = [
        { rooming_list_booking_id: 1, rooming_list_id: roomingListId, booking_id: 101 },
        { rooming_list_booking_id: 2, rooming_list_id: roomingListId, booking_id: 102 },
      ];
      const mockBookings = [
        { booking_id: 101, hotel_id: 1, event_id: 1, guest_name: 'Guest 1', guest_phone_number: '111', check_in_date: new Date(), check_out_date: new Date() },
        { booking_id: 102, hotel_id: 1, event_id: 1, guest_name: 'Guest 2', guest_phone_number: '222', check_in_date: new Date(), check_out_date: new Date() },
      ];

      jest.spyOn(roomingListBookingsRepository, 'find').mockResolvedValue(mockRoomingListBookings as RoomingListBooking[]);
      jest.spyOn(bookingsRepository, 'findByIds').mockResolvedValue(mockBookings as Booking[]);

      const result = await service.findBookingsByRoomingListId(roomingListId);

      expect(roomingListBookingsRepository.find).toHaveBeenCalledWith({
        where: { rooming_list_id: roomingListId },
      });
      expect(bookingsRepository.findByIds).toHaveBeenCalledWith([101, 102]);
      expect(result).toEqual(mockBookings);
    });

    it('should return an empty array if no rooming list bookings are found', async () => {
      const roomingListId = 999;
      jest.spyOn(roomingListBookingsRepository, 'find').mockResolvedValue([]);

      const result = await service.findBookingsByRoomingListId(roomingListId);

      expect(roomingListBookingsRepository.find).toHaveBeenCalledWith({
        where: { rooming_list_id: roomingListId },
      });
      expect(bookingsRepository.findByIds).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
