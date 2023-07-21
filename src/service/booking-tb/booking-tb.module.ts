import { Module } from '@nestjs/common';
import { BookingTbService } from './booking-tb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from '@/entities/Booking.entity';
import { RoomTbModule } from '../room-tb/room-tb.module';
import { UserTbModule } from '../user-tb/user-tb.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingEntity]),
    RoomTbModule,
    UserTbModule,
  ],
  providers: [BookingTbService],
  exports: [BookingTbService],
})
export class BookingTbModule {}
