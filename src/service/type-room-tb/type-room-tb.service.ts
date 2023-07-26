import { CreateTypeRoomDto, UpdateTypeRoomDto } from '@/dto/type.room.dto';
import { TypeRoomEntity } from '@/entities/type.room.entity';
import { Pagination, TypeRoom } from '@/utils/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeRoomTbService {
  constructor(
    @InjectRepository(TypeRoomEntity)
    private readonly typeRoomRepository: Repository<TypeRoomEntity>,
  ) {}

  // Create
  async create(createTypeRoom: CreateTypeRoomDto) {
    const newTypeRoom = this.typeRoomRepository.create(createTypeRoom);
    return await this.typeRoomRepository.save(newTypeRoom);
  }

  // Update
  async update(updateTypeRoom: UpdateTypeRoomDto) {
    return await this.typeRoomRepository.save(updateTypeRoom);
  }

  // Delete
  async delete(id: string) {
    return await this.typeRoomRepository.softDelete(id);
  }

  // Find and pagination
  async find(pagination: Pagination) {
    const [result, total] = await this.typeRoomRepository.findAndCount({
      relations: ['Rooms'],
      take: pagination.size,
      skip: (pagination.page - 1) * pagination.size,
      order: {
        CreatedAt: 'DESC',
      },
    });
    return {
      data: result,
      pagination: {
        page: pagination.page,
        count: total,
      },
    };
  }

  // Find one
  async findOne(options: Partial<TypeRoom>) {
    return await this.typeRoomRepository.findOne({
      where: { ...options },
    });
  }

  // Find by id
  async findById(id: string) {
    return await this.typeRoomRepository.findOne({
      where: { ID: id },
      relations: ['Rooms'],
    });
  }
}
