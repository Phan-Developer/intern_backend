import { Module } from '@nestjs/common';
import { UserTbModule } from './user-tb/user-tb.module';
import { CommentTbModule } from './comment-tb/comment-tb.module';
import { RoomTbModule } from './room-tb/room-tb.module';
import { BookingTbModule } from './booking-tb/booking-tb.module';
import { AmenityTbModule } from './amenity-tb/amenity-tb.module';
import { DeviceTbModule } from './device-tb/device-tb.module';
import { NotificationTbModule } from './notification-tb/notification-tb.module';
import { TypeRoomTbModule } from './type-room-tb/type-room-tb.module';

const REUSE_LIST = [
  UserTbModule,
  CommentTbModule,
  RoomTbModule,
  BookingTbModule,
  AmenityTbModule,
  DeviceTbModule,
  NotificationTbModule,
  TypeRoomTbModule,
];
@Module({
  imports: [...REUSE_LIST],
  exports: [...REUSE_LIST],
})
export class ServiceModule {}
