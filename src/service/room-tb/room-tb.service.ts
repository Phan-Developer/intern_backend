import { RoomEntity } from '@/entities/Room.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomParams, Pagination, UpdateRoomParams } from '@/utils/types';

@Injectable()
export class RoomTbService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
  ) {}

  async findById(id: string): Promise<RoomEntity> {
    return await this.roomRepository.findOne({
      where: { ID: id },
      relations: ['TypeRoomId'],
    });
  }

  async findAll(pagination: Pagination) {
    const skip = (pagination.page - 1) * pagination.size;
    const totalComment = await this.roomRepository.count();

    const rooms = await this.roomRepository.find({
      relations: ['TypeRoomId'],
      take: pagination.size,
      skip: skip,
      order: { CreatedAt: 'DESC' },
    });
    return {
      currentPage: pagination.page,
      totalComment: totalComment,
      rooms,
    };
  }

  async create(createRoomParams: CreateRoomParams): Promise<RoomEntity> {
    const craeteRoom = this.roomRepository.create(createRoomParams);
    return await this.roomRepository.save(craeteRoom);
  }

  async update(updateRoomParams: UpdateRoomParams) {
    const room = await this.findById(updateRoomParams.ID);
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }

    if (updateRoomParams.Address) {
      room.Address = updateRoomParams.Address;
    }

    if (updateRoomParams.Bedroom) {
      room.Bedroom = updateRoomParams.Bedroom;
    }

    if (updateRoomParams.Beds) {
      room.Beds = updateRoomParams.Beds;
    }

    if (updateRoomParams.Description) {
      room.Description = updateRoomParams.Description;
    }

    if (updateRoomParams.Guests) {
      room.Guests = updateRoomParams.Guests;
    }

    if (updateRoomParams.Latitude) {
      room.Latitude = updateRoomParams.Latitude;
    }

    if (updateRoomParams.Longtitude) {
      room.Longtitude = updateRoomParams.Longtitude;
    }

    if (updateRoomParams.Price) {
      room.Price = updateRoomParams.Price;
    }

    if (updateRoomParams.Title) {
      room.Title = updateRoomParams.Title;
    }

    if (updateRoomParams.Images) {
      room.Images = updateRoomParams.Images;
    }

    if (updateRoomParams.IsBooking) {
      room.IsBooking = updateRoomParams.IsBooking;
    }
    return await this.roomRepository.save(room);
  }

  async delete(roomId: string) {
    const room = await this.findById(roomId);
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }
    return await this.roomRepository.softDelete(roomId);
  }
}
