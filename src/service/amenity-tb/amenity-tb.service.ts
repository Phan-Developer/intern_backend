import { CreateAmenityDto, UpdateAmenityParams } from '@/dto/amenity.dto';
import { AmenityEntity } from '@/entities/amenity.entity';
import { Amenity, Pagination } from '@/utils/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AmenityTbService {
  constructor(
    @InjectRepository(AmenityEntity)
    private readonly amenityRepository: Repository<AmenityEntity>,
  ) {}

  // Create
  async create(createAmenity: CreateAmenityDto) {
    const newAmenity = this.amenityRepository.create(createAmenity);
    return await this.amenityRepository.save(newAmenity);
  }

  // Update
  async update(updateAmenity: UpdateAmenityParams) {
    return await this.amenityRepository.save(updateAmenity);
  }

  // Delete
  async delete(id: string) {
    return await this.amenityRepository.softDelete(id);
  }

  // Find and pagination
  async findAndPagination(pagination: Pagination = { page: 1, size: 10 }) {
    const [result, total] = await this.amenityRepository.findAndCount({
      relations: ['Devices'],
      take: pagination.size,
      skip: (pagination.page - 1) * pagination.size,
      order: {
        CreatedAt: 'DESC',
      },
    });
    return {
      data: result,
      count: total,
    };
  }

  async findById(id: string): Promise<Amenity> {
    return await this.amenityRepository.findOne({
      relations: ['Devices'],
      where: { ID: id },
    });
  }

  // Find one
  async findOne(options: Partial<Amenity>) {
    return await this.amenityRepository.findOne({
      relations: ['Devices'],
      where: { ...options },
    });
  }
}
