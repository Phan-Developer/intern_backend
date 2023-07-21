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

@Controller('type-room')
export class TypeRoomController {
  constructor(private readonly typeRoomService: TypeRoomService) {}

  // Create
  @Post()
  @ApiBearerAuth()
  @ApiTags('TypeRoom')
  @UseGuards(JwtAuthGuard)
  @Roles(roles.ADMIN)
  async createTypeRoom(@Body() typeRoom: CreateTypeRoomDto) {
    return await this.typeRoomService.create(typeRoom);
  }

  // Update
  @Put(':id')
  @ApiBearerAuth()
  @ApiTags('TypeRoom')
  @UseGuards(JwtAuthGuard)
  @Roles(roles.ADMIN)
  async updateTypeRoom(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() typeRoom: UpdateTypeRoomDto,
  ) {
    return await this.typeRoomService.update(id, typeRoom);
  }

  // Delete
  @Delete(':id')
  @ApiBearerAuth()
  @ApiTags('TypeRoom')
  @UseGuards(JwtAuthGuard)
  @Roles(roles.ADMIN)
  async deleteTypeRoom(@Param('id', ParseUUIDPipe) id: string) {
    return await this.typeRoomService.delete(id);
  }

  // Find
  @Get()
  @ApiBearerAuth()
  @ApiTags('TypeRoom')
  @UseGuards(JwtAuthGuard)
  async findTypeRoom(@Query() pagination: Pagination) {
    return await this.typeRoomService.find(pagination);
  }

  // Find by Type Room Id
  @Get(':id')
  @ApiBearerAuth()
  @ApiTags('TypeRoom')
  @UseGuards(JwtAuthGuard)
  async findByTypeRoomId(@Param('id', ParseUUIDPipe) id: string) {
    return await this.typeRoomService.findById(id);
  }
}
