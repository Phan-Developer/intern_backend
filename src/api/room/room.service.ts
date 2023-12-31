import { CreateRoomDto, UpdateRoomDto } from '@/dto/Room.dto';
import { TypeRoomTbService } from '@/service/type-room-tb/type-room-tb.service';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UploadFileService } from '../upload-file/upload-file.service';
import * as fs from 'fs';
import { RoomTbService } from '@/service/room-tb/room-tb.service';
import { Pagination } from '@/utils/types';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomTbService: RoomTbService,
    private readonly typeRoomTbService: TypeRoomTbService,
    private readonly uploadFileService: UploadFileService,
  ) {}

  async findRoomById(id: string) {
    const room = await this.roomTbService.findById(id);
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }
    return room;
  }

  async findRoom(pagination: Pagination) {
    return await this.roomTbService.findAll(pagination);
  }

  async create(createRoomParams: CreateRoomDto) {
    // find type room
    const typeRoom = await this.typeRoomTbService.findById(
      createRoomParams.TypeRoomId,
    );

    if (!typeRoom) throw new NotFoundException('Mã loại phòng không chính xác');

    if (createRoomParams.Price < 1) {
      throw new HttpException(
        'Gía phòng phải lơn hơn 0',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.roomTbService.create({
      ...createRoomParams,
      TypeRoomId: typeRoom,
    });
  }

  async update(updateRoomParams: UpdateRoomDto) {
    const room = await this.roomTbService.findById(updateRoomParams.ID);
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }
    // find type room
    const typeRoom = await this.typeRoomTbService.findOne({
      ID: updateRoomParams.TypeRoomId,
    });

    if (!typeRoom) throw new NotFoundException('Mã loại phòng không chính xác');

    if (updateRoomParams.Price < 1) {
      throw new HttpException(
        'Gía phòng phải lơn hơn 0',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (updateRoomParams.Images.length > 0) {
      const deletePromises = room.Images.map(async (path) => {
        await this.uploadFileService.deleteFileFromFilePath(path);
      });
      await Promise.all(deletePromises);
      room.Images = updateRoomParams.Images;
    }

    return await this.roomTbService.update({
      ...updateRoomParams,
      Images: room.Images,
      TypeRoomId: typeRoom,
    });
  }

  async delete(roomId: string): Promise<string> {
    const room = await this.roomTbService.findById(roomId);
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }
    room.Images.forEach((image) => {
      fs.unlinkSync(image);
    });

    await this.roomTbService.delete(roomId);
    return 'Xoá phòng thành công';
  }
}
