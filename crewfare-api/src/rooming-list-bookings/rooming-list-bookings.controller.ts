import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomingListBookingsService } from './rooming-list-bookings.service';
import { CreateRoomingListBookingDto } from './dto/create-rooming-list-booking.dto';
import { UpdateRoomingListBookingDto } from './dto/update-rooming-list-booking.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('rooming-list-bookings')
export class RoomingListBookingsController {
  constructor(private readonly roomingListBookingsService: RoomingListBookingsService) {}

  @Post()
  create(@Body() createRoomingListBookingDto: CreateRoomingListBookingDto) {
    return this.roomingListBookingsService.create(createRoomingListBookingDto);
  }

  @Get()
  findAll() {
    return this.roomingListBookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomingListBookingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomingListBookingDto: UpdateRoomingListBookingDto) {
    return this.roomingListBookingsService.update(+id, updateRoomingListBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomingListBookingsService.remove(+id);
  }

  @Post('import')
  importAll(@Body() createRoomingListBookingDtos: CreateRoomingListBookingDto[]) {
    return this.roomingListBookingsService.importAll(createRoomingListBookingDtos);
  }
}
