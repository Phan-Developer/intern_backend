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
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, UpdateRoomDto } from '@/dto/Room.dto';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from '@/service/comment-tb/comment-tb.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileExtensionFilter, storegeConfig } from '@/utils/filters';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { RolesGuard } from '@/auth/roles.guard';
import { Roles } from '@/auth/roles.decorator';
import { Roles as roles } from '@/utils/variable';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      fileFilter: fileExtensionFilter,
      storage: storegeConfig('rooms'),
    }),
  )
  async createRoom(
    @Body() createRoomDto: CreateRoomDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const arrayImage = files.map((file) => {
      return `${file.destination}/${file.filename}`;
    });

    return await this.roomService.create({
      ...createRoomDto,
      Images: arrayImage,
    });
  }

  @ApiTags('room')
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      fileFilter: fileExtensionFilter,
      storage: storegeConfig('rooms'),
    }),
  )
  async updateRoom(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    let imageArray = [];
    if (files)
      imageArray = files.map((file) => {
        return `${file.destination}/${file.filename}`;
      });
    return await this.roomService.update(id, {
      ...updateRoomDto,
      Images: imageArray,
    });
  }

  @ApiTags('room')
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  async deleteRoom(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomService.delete(id);
  }
}
