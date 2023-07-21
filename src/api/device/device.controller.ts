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

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  // Create
  @Post()
  @ApiBearerAuth()
  @ApiTags('Device')
  @UseGuards(JwtAuthGuard)
  @Roles(roles.ADMIN)
  async createDevice(@Body() device: CreateDeviceDto) {
    return await this.deviceService.create(device);
  }

  // Update
  @Put(':id')
  @ApiBearerAuth()
  @ApiTags('Device')
  @UseGuards(JwtAuthGuard)
  @Roles(roles.ADMIN)
  async updateDevice(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDevice: UpdateDeviceDto,
  ) {
    return await this.deviceService.update(id, updateDevice);
  }

  // Delete
  @Delete(':id')
  @ApiBearerAuth()
  @ApiTags('Device')
  @UseGuards(JwtAuthGuard)
  @Roles(roles.ADMIN)
  async deleteDevice(@Param('id', ParseUUIDPipe) id: string) {
    return await this.deviceService.delete(id);
  }

  // Find and pagination
  @Get()
  @ApiBearerAuth()
  @ApiTags('Device')
  @UseGuards(JwtAuthGuard)
  async findAndPagination(@Query() pagination: Pagination) {
    return await this.deviceService.findAndPagination(pagination);
  }

  // Find by id
  @Get(':id')
  @ApiBearerAuth()
  @ApiTags('Device')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.deviceService.findById(id);
  }
}