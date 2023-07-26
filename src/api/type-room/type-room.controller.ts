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
import { TypeRoomService } from './type-room.service';
import { CreateTypeRoomDto, UpdateTypeRoomDto } from '@/dto/type.room.dto';
import { Pagination } from '@/utils/types';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Roles as roles } from '@/utils/variable';
import { Roles } from '@/auth/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@/auth/roles.guard';

@ApiTags('TypeRoom')
@Controller('type-room')
export class TypeRoomController {
  constructor(private readonly typeRoomService: TypeRoomService) {}

  // Create
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  async createTypeRoom(@Body() typeRoom: CreateTypeRoomDto) {
    return await this.typeRoomService.create(typeRoom);
  }

  // Update
  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  async updateTypeRoom(@Body() typeRoom: UpdateTypeRoomDto) {
    return await this.typeRoomService.update(typeRoom);
  }

  // Delete
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  async deleteTypeRoom(@Param('id', ParseUUIDPipe) id: string) {
    return await this.typeRoomService.delete(id);
  }

  // Find
  @Get()
  async findTypeRoom(@Query() pagination: Pagination) {
    return await this.typeRoomService.find(pagination);
  }

  // Find by Type Room Id
  @Get(':id')
  async findByTypeRoomId(@Param('id', ParseUUIDPipe) id: string) {
    return await this.typeRoomService.findById(id);
  }
}
