import { Pagination } from '@/service/comment-tb/comment-tb.service';
import {
  CreateRoomParams,
  RoomTbService,
  UpdateRoomParams,
} from '@/service/room-tb/room-tb.service';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class RoomService {
  constructor(private readonly roomTbService: RoomTbService) {}

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

  async create(createRoomParams: CreateRoomParams) {
    if (createRoomParams.Price < 1) {
      throw new HttpException(
        'Gía phòng phải lơn hơn 0',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.roomTbService.create(createRoomParams);
  }

  async update(id: string, updateRoomParams: UpdateRoomParams) {
    const room = await this.roomTbService.findById(id);
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }
    if (updateRoomParams.Price < 1) {
      throw new HttpException(
        'Gía phòng phải lơn hơn 0',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.roomTbService.update(id, updateRoomParams);
  }

  async delete(roomId: string): Promise<string> {
    await this.roomTbService.delete(roomId);
    return 'Xoá phòng thành công';
  }
}
