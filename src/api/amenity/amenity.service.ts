import { CreateAmenityDto, UpdateAmenityDto } from '@/dto/amenity.dto';
import { AmenityTbService } from '@/service/amenity-tb/amenity-tb.service';
import { DeviceTbService } from '@/service/device-tb/device-tb.service';
import { Pagination } from '@/utils/types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class AmenityService {
  constructor(
    private readonly amenityTbService: AmenityTbService,
    private readonly deviceTbService: DeviceTbService,
  ) {}

  // Create
  async create(createAmenity: CreateAmenityDto) {
    return await this.amenityTbService.create(createAmenity);
  }

  // Update
  async update(updateAmenity: UpdateAmenityDto) {
    // find Amenity
    const amenity = await this.amenityTbService.findOne({
      ID: updateAmenity.ID,
    });

    if (!amenity) throw new NotFoundException('Không tìm thấy Amenity');

    // find Device list
    const devices = await this.deviceTbService.findByAmenityId(
      updateAmenity.ID,
    );

    return await this.amenityTbService.update({
      ...amenity,
      ...updateAmenity,
      Devices: devices,
    });
  }

  // Delete
  async delete(amenityId: string) {
    const amenityDeleted = await this.amenityTbService.delete(amenityId);
    if (amenityDeleted.affected !== 1)
      throw new BadRequestException('Lỗi khi thực thi lệnh xóa');
    return { message: 'Xoá thành công' };
  }

  // Find
  async findAndPagination(pagination: Pagination) {
    return await this.amenityTbService.findAndPagination(
      pagination || { page: 1, size: 10 },
    );
  }

  // Find by id
  async findById(amenityId: string) {
    const amenity = await this.amenityTbService.findById(amenityId);
    if (!amenity) throw new BadRequestException('Không thể tìm thấy amenity');
    return amenity;
  }
}
