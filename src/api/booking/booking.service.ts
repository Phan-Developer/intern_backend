import { CreateBookingDto, UpdateBookingDto } from '@/dto/booking.dto';
import { BookingEntity } from '@/entities/Booking.entity';
import { BookingTbService } from '@/service/booking-tb/booking-tb.service';
import { Pagination } from '@/service/comment-tb/comment-tb.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingService {
  constructor(private readonly bookingTbService: BookingTbService) {}

  async findById(id: string): Promise<BookingEntity> {
    return this.bookingTbService.findById(id);
  }

  async findAll(pagination: Pagination) {
    return this.bookingTbService.findAll(pagination);
  }

  async create(createBookingDto: CreateBookingDto): Promise<BookingEntity> {
    return await this.bookingTbService.create(
      createBookingDto,
      'b0f2004c-cd44-40cf-b026-e01e3845d59d',
    );
  }

  async update(
    bookingId: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<BookingEntity> {
    return await this.bookingTbService.update(bookingId, updateBookingDto);
  }

  async delete(id: string): Promise<string> {
    await this.bookingTbService.delete(id);

    return 'Xoá booking thành công';
  }
}
