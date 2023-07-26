import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingTbModule } from '@/service/booking-tb/booking-tb.module';
import { UserTbModule } from '@/service/user-tb/user-tb.module';
import { RoomTbModule } from '@/service/room-tb/room-tb.module';

@Module({
  imports: [BookingTbModule, UserTbModule, RoomTbModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
