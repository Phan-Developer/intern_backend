import { CreateAmenityDto, UpdateAmenityDto } from '@/dto/amenity.dto';
import { AmenityTbService } from '@/service/amenity-tb/amenity-tb.service';
import { DeviceTbService } from '@/service/device-tb/device-tb.service';
import { Pagination } from '@/utils/types';
import {
  HttpException,
  HttpStatus,
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
  async update(amenityId: string, updateAmenity: UpdateAmenityDto) {
    // find Amenity
    const amenity = await this.amenityTbService.findOne({ ID: amenityId });

    if (!amenity)
      throw new NotFoundException(
        'Không tìm thấy Amenity với id: ' + amenityId,
      );
    // find Device list
    const devices = await this.deviceTbService.findByAmenityId(amenityId);

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
      throw new HttpException(
        'Lỗi khi thực thi lệnh xóa',
        HttpStatus.BAD_REQUEST,
      );
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
    const amenity = await this.amenityTbService.findOne({ ID: amenityId });
    if (!amenity)
      throw new HttpException(
        'Không thể tìm thấy Amenity với id: ' + amenityId,
        HttpStatus.BAD_REQUEST,
      );
    return amenity;
  }
}
