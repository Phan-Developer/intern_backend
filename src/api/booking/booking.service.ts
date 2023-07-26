import { CreateBookingDto, UpdateBookingDto } from '@/dto/booking.dto';
import { BookingEntity } from '@/entities/Booking.entity';
import { BookingTbService } from '@/service/booking-tb/booking-tb.service';
import { RoomTbService } from '@/service/room-tb/room-tb.service';
import { UserTbService } from '@/service/user-tb/user-tb.service';
import { Pagination } from '@/utils/types';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingTbService: BookingTbService,
    private readonly userTbService: UserTbService,
    private readonly roomTbService: RoomTbService,
  ) {}

  async findById(id: string): Promise<BookingEntity> {
    return this.bookingTbService.findById(id);
  }

  async findAll(pagination: Pagination) {
    return this.bookingTbService.findAll(pagination);
  }

  async create(
    createBookingDto: CreateBookingDto,
    userId: string,
  ): Promise<BookingEntity> {
    const user = await this.userTbService.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    const room = await this.roomTbService.findById(createBookingDto.RoomId);
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }
    return await this.bookingTbService.create(createBookingDto, user, room);
  }

  async update(updateBookingDto: UpdateBookingDto): Promise<BookingEntity> {
    const booking = await this.findById(updateBookingDto.ID);
    if (!booking) {
      throw new NotFoundException('Booking không tồn tại');
    }
    return await this.bookingTbService.update(
      updateBookingDto,
      updateBookingDto.ID,
    );
  }

  async delete(id: string): Promise<string> {
    await this.bookingTbService.delete(id);
    return 'Xoá booking thành công';
  }
}
