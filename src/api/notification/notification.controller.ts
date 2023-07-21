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
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotifyDto, UpdateNotifyDto } from '@/dto/notification.dto';
import { Pagination } from '@/utils/types';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { JWTPayload } from '@/dto/jwt.dto';
import { Roles as roles } from '@/utils/variable';
import { Roles } from '@/auth/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@/auth/roles.guard';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Create
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  async create(@Body() createNotify: CreateNotifyDto, @Request() request) {
    if (!request.user) throw new UnauthorizedException();
    const user: JWTPayload = request.user;
    return await this.notificationService.create(createNotify, user.ID);
  }

  // Update
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNotify: UpdateNotifyDto,
    @Request() request,
  ) {
    if (!request.user) throw new UnauthorizedException();
    const user: JWTPayload = request.user;
    return await this.notificationService.update(id, updateNotify, user.ID);
  }

  // Delete by notify id
  @Delete('delete-by-notify/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  async deleteByNotifyId(@Param('id', ParseUUIDPipe) id: string) {
    return await this.notificationService.deleteByNotifyId(id);
  }

  // Delete by user id
  @Delete('delete-by-user/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(roles.ADMIN)
  async deleteByUserId(@Param('id', ParseUUIDPipe) id: string) {
    return await this.notificationService.deleteByUserId(id);
  }

  // Find and pagination
  @Get()
  @ApiBearerAuth()
  async findAndPagination(@Query() pagination: Pagination) {
    return await this.notificationService.findAndPagination(pagination);
  }

  // Find by notify id
  @Get('by-notify/:id')
  @ApiBearerAuth()
  async findByNotifyId(@Param('id', ParseUUIDPipe) id: string) {
    return await this.notificationService.findByNotifyId(id);
  }

  // Find all notify by user id
  @Get('by-user/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findByUserId(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() pagination: Pagination,
  ) {
    const paginate = {
      page: pagination.page ? pagination.page : 1,
      size: pagination.size ? pagination.size : 10,
    } as Pagination;
    return await this.notificationService.findNotifyByUserId(id, paginate);
  }
}
