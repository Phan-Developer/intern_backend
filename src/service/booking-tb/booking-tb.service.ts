import { BookingEntity } from '@/entities/Booking.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateBookingParams,
  Pagination,
  UpdateBookingParams,
} from '@/utils/types';
import { UserEntity } from '@/entities/user.entity';
import { RoomEntity } from '@/entities/Room.entity';

@Injectable()
export class BookingTbService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingTbRepository: Repository<BookingEntity>,
  ) {}

  async findById(id: string): Promise<BookingEntity> {
    return await this.bookingTbRepository.findOne({ where: { ID: id } });
  }

  async findAll(pagination: Pagination) {
    const skip = (pagination.page - 1) * pagination.size;
    const totalComment = await this.bookingTbRepository.count();
    const totaPage = Math.ceil(totalComment / pagination.size);

    const bookings = await this.bookingTbRepository.find({
      take: pagination.size,
      skip: skip,
      order: { CreatedAt: 'DESC' },
    });
    return {
      currentPage: pagination.page,
      totalComment: totalComment,
      bookings,
    };
  }

  async create(
    createBookingParams: CreateBookingParams,
    user: UserEntity,
    room: RoomEntity,
  ): Promise<BookingEntity> {
    const createBooking = await this.bookingTbRepository.create({
      RoomId: room,
      UserId: user,
      ArrivalDate: createBookingParams.ArrivalDate,
    });
    return await this.bookingTbRepository.save(createBooking);
  }

  async update(
    updateBookingParams: UpdateBookingParams,
    id: string,
  ): Promise<BookingEntity> {
    const booking = await this.findById(id);
    if (!booking) {
      throw new NotFoundException('Không tìm thấy booking');
    }
    if (updateBookingParams.ArrivalDate) {
      booking.ArrivalDate = updateBookingParams.ArrivalDate;
    }
    if (updateBookingParams.CheckIn) {
      booking.CheckIn = updateBookingParams.CheckIn;
    }
    if (updateBookingParams.CheckOut) {
      booking.CheckOut = updateBookingParams.CheckOut;
    }
    if (updateBookingParams.Status) {
      booking.Status = updateBookingParams.Status;
    }
    if (updateBookingParams.TotalMoney) {
      booking.TotalMoney = updateBookingParams.TotalMoney;
    }
    return await this.bookingTbRepository.save(booking);
  }

  async delete(id: string) {
    const booking = await this.findById(id);
    if (!booking) {
      throw new NotFoundException('Booking không tồn tại');
    }
    return await this.bookingTbRepository.softDelete(id);
  }
}
