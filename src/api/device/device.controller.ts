import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto, UpdateDeviceDto } from '@/dto/device.dto';
import { Pagination } from '@/utils/types';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

import { Roles as roles } from '@/utils/variable';
import { Roles } from '@/auth/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@/auth/roles.guard';

@ApiTags('Device')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  // Create
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  async createDevice(@Body() device: CreateDeviceDto) {
    return await this.deviceService.create(device);
  }

  // Update
  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  async updateDevice(@Body() updateDevice: UpdateDeviceDto) {
    return await this.deviceService.update(updateDevice);
  }

  // Delete
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  async deleteDevice(@Param('id', ParseUUIDPipe) id: string) {
    return await this.deviceService.delete(id);
  }

  // Find and pagination
  @Get()
  async findAndPagination(@Query() pagination: Pagination) {
    return await this.deviceService.findAndPagination(pagination);
  }

  // Find by id
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.deviceService.findById(id);
  }
}
