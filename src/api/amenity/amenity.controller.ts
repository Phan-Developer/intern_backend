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

@Controller('amenity')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  // Create
  @Post()
  @ApiBearerAuth()
  @ApiTags('Amenity')
  @UseGuards(JwtAuthGuard)
  async createAmenity(@Body() amenity: CreateAmenityDto) {
    return await this.amenityService.create(amenity);
  }

  // Update
  @Put(':id')
  @ApiBearerAuth()
  @ApiTags('Amenity')
  @UseGuards(JwtAuthGuard)
  @Roles(roles.ADMIN)
  async updateAmenity(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newAmenity: UpdateAmenityDto,
  ) {
    return await this.amenityService.update(id, newAmenity);
  }

  // Delete
  @Delete(':id')
  @ApiBearerAuth()
  @ApiTags('Amenity')
  @Roles(roles.ADMIN)
  async deleteAmenity(@Param('id', ParseUUIDPipe) id: string) {
    return await this.amenityService.delete(id);
  }

  // Find
  @Get()
  @ApiBearerAuth()
  @ApiTags('Amenity')
  @UseGuards(JwtAuthGuard)
  async find(@Query() pagination: Pagination) {
    return await this.amenityService.findAndPagination(pagination);
  }

  // Find by id
  @Get(':id')
  @ApiBearerAuth()
  @ApiTags('Amenity')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.amenityService.findById(id);
  }
}
