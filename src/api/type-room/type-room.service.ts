import { CreateTypeRoomDto, UpdateTypeRoomDto } from '@/dto/type.room.dto';
import { TypeRoomTbService } from '@/service/type-room-tb/type-room-tb.service';
import { Pagination } from '@/utils/types';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class TypeRoomService {
  constructor(private readonly typeRoomTbService: TypeRoomTbService) {}

  // create
  async create(createTypeRoom: CreateTypeRoomDto) {
    return await this.typeRoomTbService.create(createTypeRoom);
  }

  // update
  async update(updateTypeRoom: UpdateTypeRoomDto) {
    // find the type room
    const typeRoom = await this.typeRoomTbService.findById(updateTypeRoom.ID);

    if (!typeRoom) throw new NotFoundException('Loại phòng không tồn tại');
    return await this.typeRoomTbService.update({
      ...typeRoom,
      ...updateTypeRoom,
    });
  }

  // delete
  async delete(typeRoomId: string) {
    const typeRoomDeleted = await this.typeRoomTbService.delete(typeRoomId);

    if (typeRoomDeleted.affected !== 1)
      throw new BadRequestException('Lỗi khi thực thi lệnh xóa TypeRoom');
    return { message: 'Xoá thành công' };
  }

  // find
  async find(pagination: Pagination) {
    return await this.typeRoomTbService.find(
      pagination || { page: 1, size: 10 },
    );
  }

  // find by id
  async findById(typeRoomId: string) {
    const typeRoom = await this.typeRoomTbService.findById(typeRoomId);
    if (!typeRoom) throw new BadRequestException('Không thể tìm thấy TypeRoom');
    return typeRoom;
  }
}
