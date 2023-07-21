import { RoomEntity } from '@/entities/Room.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination } from '../comment-tb/comment-tb.service';

export interface CreateRoomParams {
  Title: string;
  Description: string;
  Images: string;
  Address: string;
  Latitude: string;
  Longtitude: string;
  Guests: number;
  Bedroom: number;
  Beds: number;
  Price: number;
}

export interface UpdateRoomParams {
  Title?: string;
  Description?: string;
  Images?: string;
  Address?: string;
  Latitude?: string;
  Longtitude?: string;
  Guests?: number;
  Bedroom?: number;
  Beds?: number;
  Price?: number;
  IsBooking?: boolean;
}

@Injectable()
export class RoomTbService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
  ) {}

  async findById(id: string): Promise<RoomEntity> {
    return await this.roomRepository.findOne({ where: { ID: id } });
  }

  async findAll(pagination: Pagination) {
    const skip = (pagination.page - 1) * pagination.take;
    const totalComment = await this.roomRepository.count();
    const totaPage = Math.ceil(totalComment / pagination.take);

    const rooms = await this.roomRepository.find({
      take: pagination.take,
      skip: skip,
    });
    return {
      currentPage: pagination.page,
      take: pagination.take,
      totalComment: totalComment,
      totaPage: totaPage,
      rooms,
    };
  }

  async create(createRoomParams: CreateRoomParams): Promise<RoomEntity> {
    const craeteRoom = await this.roomRepository.create(createRoomParams);
    return await this.roomRepository.save(craeteRoom);
  }

  async update(roomId: string, updateRoomParams: UpdateRoomParams) {
    const room = await this.findById(roomId);
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
