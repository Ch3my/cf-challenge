import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomingListsService } from './rooming-lists.service';
import { CreateRoomingListDto } from './dto/create-rooming-list.dto';
import { UpdateRoomingListDto } from './dto/update-rooming-list.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('rooming-lists')
export class RoomingListsController {
  constructor(private readonly roomingListsService: RoomingListsService) {}

  @Post()
  create(@Body() createRoomingListDto: CreateRoomingListDto) {
    return this.roomingListsService.create(createRoomingListDto);
  }

  @Get()
  findAll() {
    return this.roomingListsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomingListsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomingListDto: UpdateRoomingListDto) {
    return this.roomingListsService.update(+id, updateRoomingListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomingListsService.remove(+id);
  }

  @Get(':id/bookings')
  findBookingsByRoomingListId(@Param('id') id: string) {
    return this.roomingListsService.findBookingsByRoomingListId(+id);
  }

  @Post('import')
  importAll(@Body() createRoomingListDtos: CreateRoomingListDto[]) {
    return this.roomingListsService.importAll(createRoomingListDtos);
  }
}
