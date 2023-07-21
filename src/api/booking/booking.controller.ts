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
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from '@/service/comment-tb/comment-tb.service';
import { CreateBookingDto, UpdateBookingDto } from '@/dto/booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiTags('booking')
  @Get()
  async getAllBooking(
    @Query('page') page: number | undefined,
    @Query('take') take: number | undefined,
  ) {
    const defaultPage = 1;
    const defaultTake = 5;
    const pagination = {
      page: page !== undefined ? page : defaultPage,
      take: take !== undefined ? take : defaultTake,
    } as Pagination;
    return await this.bookingService.findAll(pagination);
  }

  @ApiTags('booking')
  @Get(':id')
  async getBooking(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookingService.findById(id);
  }

  @ApiTags('booking')
  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingService.create(createBookingDto);
  }

  @ApiTags('booking')
  @Put(':id')
  async editBooking(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return await this.bookingService.update(id, updateBookingDto);
  }

  @ApiTags('booking')
  @Delete(':id')
  async deleteBooking(@Param('id', ParseUUIDPipe) id: string) {
    return await this.bookingService.delete(id);
  }
}
