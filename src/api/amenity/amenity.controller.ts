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
import { AmenityService } from './amenity.service';
import { Pagination } from '@/utils/types';
import { CreateAmenityDto, UpdateAmenityDto } from '@/dto/amenity.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Roles as roles } from '@/utils/variable';
import { Roles } from '@/auth/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@/auth/roles.guard';

@ApiTags('Amenity')
@Controller('amenity')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  // Create
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createAmenity(@Body() amenity: CreateAmenityDto) {
    return await this.amenityService.create(amenity);
  }

  // Update
  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateAmenity(@Body() newAmenity: UpdateAmenityDto) {
    return await this.amenityService.update(newAmenity);
  }

  // Delete
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  async deleteAmenity(@Param('id', ParseUUIDPipe) id: string) {
    return await this.amenityService.delete(id);
  }

  // Find
  @Get()
  async find(@Query() pagination: Pagination) {
    return await this.amenityService.findAndPagination(pagination);
  }

  // Find by id
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.amenityService.findById(id);
  }
}
