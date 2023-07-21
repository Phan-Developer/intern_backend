import { BookingEntity } from '@/entities/Booking.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomTbService } from '../room-tb/room-tb.service';
import { UserTbService } from '../user-tb/user-tb.service';
import { Pagination } from '../comment-tb/comment-tb.service';

export interface CreateBookingParams {
  RoomId: string;
  ArrivalDate: Date;
}

export interface UpdateBookingParams {
  RoomId?: string;
  UserId?: string;
  ArrivalDate?: Date;
  CheckIn?: Date;
  CheckOut?: Date;
  TotalMoney?: number;
  Status?: boolean;
}

@Injectable()
export class BookingTbService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingTbRepository: Repository<BookingEntity>,
    private readonly roomTbService: RoomTbService,
    private readonly userTbService: UserTbService,
  ) {}

  async findById(id: string): Promise<BookingEntity> {
    return await this.bookingTbRepository.findOne({ where: { ID: id } });
  }

  async findAll(pagination: Pagination) {
    const skip = (pagination.page - 1) * pagination.take;
    const totalComment = await this.bookingTbRepository.count();
    const totaPage = Math.ceil(totalComment / pagination.take);

    const bookings = await this.bookingTbRepository.find({
      take: pagination.take,
      skip: skip,
    });
    return {
      currentPage: pagination.page,
      take: pagination.take,
      totalComment: totalComment,
      totaPage: totaPage,
      bookings,
    };
  }

  async create(
    createBookingParams: CreateBookingParams,
    userId: string,
  ): Promise<BookingEntity> {
    const room = await this.roomTbService.findById(createBookingParams.RoomId);
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }

    const user = await this.userTbService.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    const createBooking = await this.bookingTbRepository.create({
      RoomId: room,
      UserId: user,
      ArrivalDate: createBookingParams.ArrivalDate,
    });
    return await this.bookingTbRepository.save(createBooking);
  }

  async update(
    id: string,
    updateBookingParams: UpdateBookingParams,
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
    return await this.bookingTbRepository.softDelete(id);
  }
}
