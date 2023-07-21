import { CreateDeviceParams, UpdateDeviceParams } from '@/dto/device.dto';
import { DeviceEntity } from '@/entities/device.entity';
import { Device, Pagination } from '@/utils/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceTbService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
  ) {}

  // Create
  async create(createDevice: CreateDeviceParams) {
    const newDevice = this.deviceRepository.create(createDevice);
    return await this.deviceRepository.save(newDevice);
  }

  // Update
  async update(updateDevice: UpdateDeviceParams) {
    return await this.deviceRepository.save(updateDevice);
  }

  // Delete
  async delete(id: string) {
    return await this.deviceRepository.softDelete(id);
  }

  // Find and pagination
  async findAndPagination(pagination: Pagination = { page: 1, size: 10 }) {
    const [result, total] = await this.deviceRepository.findAndCount({
      relations: ['Amenity', 'Amenity.Devices'],
      take: pagination.size,
      skip: (pagination.page - 1) * pagination.size,
    });
    return {
      data: result,
      pagination: {
        page: pagination.page,
        size: pagination.size > total ? total : pagination.size,
        count: total,
      } as Pagination,
    };
  }

  // Find by Amenity Id
  async findByAmenityId(amenityId: string) {
    return await this.deviceRepository.find({
      relations: ['Amenity'],
      where: {
        Amenity: {
          ID: amenityId,
        },
      },
    });
  }

  // Find one
  async findOne(options: Partial<Device>) {
    return await this.deviceRepository.findOne({
      relations: ['Amenity', 'Amenity.Devices'],
      where: { ...options },
    });
  }
}
