import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBookingDto, UpdateBookingDto } from '@/dto/booking.dto';
import { Roles } from '@/auth/roles.decorator';
import { Roles as roles } from '@/utils/variable';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Pagination } from '@/utils/types';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBearerAuth()
  @ApiTags('booking')
  @Roles(roles.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllBooking(
    @Query('page') page: number | undefined,
    @Query('size') size: number | undefined,
    @Request() req: any,
  ) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    const defaultPage = 1;
    const defaultSize = 5;
    const pagination = {
      page: page !== undefined ? page : defaultPage,
      size: size !== undefined ? size : defaultSize,
    } as Pagination;
    return await this.bookingService.findAll(pagination);
  }

  @ApiBearerAuth()
  @ApiTags('booking')
  @Roles(roles.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getBooking(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
  ) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return await this.bookingService.findById(id);
  }

  @ApiBearerAuth()
  @ApiTags('booking')
  @Roles(roles.ADMIN, roles.USER)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @Request() req: any,
  ) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return await this.bookingService.create(createBookingDto, req.user.ID);
  }

  @ApiBearerAuth()
  @ApiTags('booking')
  @Roles(roles.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put()
  async editBooking(
    @Body() updateBookingDto: UpdateBookingDto,
    @Request() req: any,
  ) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return await this.bookingService.update(updateBookingDto);
  }

  @ApiBearerAuth()
  @ApiTags('booking')
  @Roles(roles.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBooking(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
  ) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return await this.bookingService.delete(id);
  }
}
