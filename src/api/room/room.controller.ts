import {
  Controller,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Put,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, UpdateRoomDto } from '@/dto/Room.dto';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from '@/service/comment-tb/comment-tb.service';
import { Roles as roles } from '@/utils/variable';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiTags('room')
  @Get(':id')
  async getRoomById(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomService.findRoomById(id);
  }

  @Get()
  async getRoom(
    @Query('page') page: number | undefined,
    @Query('take') take: number | undefined,
  ) {
    const defaultPage = 1;
    const defaultTake = 5;
    const pagination = {
      page: page !== undefined ? page : defaultPage,
      take: take !== undefined ? take : defaultTake,
    } as Pagination;

    return await this.roomService.findRoom(pagination);
  }

  @ApiTags('room')
  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return await this.roomService.create(createRoomDto);
  }

  @ApiTags('room')
  @Put(':id')
  async updateRoom(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return await this.roomService.update(id, updateRoomDto);
  }

  @ApiTags('room')
  @Delete(':id')
  async deleteRoom(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomService.delete(id);
  }
}
