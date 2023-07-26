import { Module } from '@nestjs/common';
import { BookingTbService } from './booking-tb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from '@/entities/Booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity])],
  providers: [BookingTbService],
  exports: [BookingTbService],
})
export class BookingTbModule {}
