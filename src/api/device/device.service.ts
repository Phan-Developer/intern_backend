import { CreateDeviceDto, UpdateDeviceDto } from '@/dto/device.dto';
import { AmenityTbService } from '@/service/amenity-tb/amenity-tb.service';
import { DeviceTbService } from '@/service/device-tb/device-tb.service';
import { Pagination } from '@/utils/types';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceTbService: DeviceTbService,
    private readonly amenityTbService: AmenityTbService,
  ) {}

  // Create
  async create(createDevice: CreateDeviceDto) {
    // find amenity to add device
    const amenity = await this.amenityTbService.findOne({
      ID: createDevice.AmenityId,
    });

    if (!amenity) throw new NotFoundException('Không thể tìm thấy amenity');

    return await this.deviceTbService.create({
      ...createDevice,
      Amenity: amenity,
    });
  }

  // Update
  async update(updateDevice: UpdateDeviceDto) {
    // find the device
    const device = await this.deviceTbService.findById(updateDevice.ID);

    if (!device) throw new NotFoundException('Không thể tìm thấy thiết bị');

    // find amenity to add device
    const amenity = await this.amenityTbService.findById(
      updateDevice.AmenityId,
    );

    if (!amenity) throw new NotFoundException('Không thể tìm thấy amenity');

    return await this.deviceTbService.update({
      ...device,
      ...updateDevice,
      Amenity: amenity,
    });
  }

  // Delete
  async delete(deviceId: string) {
    const deviceDeleted = await this.deviceTbService.delete(deviceId);

    if (deviceDeleted.affected !== 1)
      throw new BadRequestException('Lỗi khi thực thi lệnh xóa thiết bị');
    return { message: 'Xoá thành công' };
  }

  // Find and pagination
  async findAndPagination(pagination: Pagination) {
    return await this.deviceTbService.findAndPagination(
      pagination || { page: 1, size: 10 },
    );
  }

  // Find by id
  async findById(deviceId: string) {
    const device = await this.deviceTbService.findById(deviceId);
    if (!device) throw new BadRequestException('Không thể tìm thấy thiết bị');
    return device;
  }
}
