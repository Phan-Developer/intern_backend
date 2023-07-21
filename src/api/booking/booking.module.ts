import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingTbModule } from '@/service/booking-tb/booking-tb.module';

@Module({
  imports: [BookingTbModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
