import { Module } from '@nestjs/common';
import { UserTbModule } from './user-tb/user-tb.module';
import { CommentTbModule } from './comment-tb/comment-tb.module';
import { RoomTbModule } from './room-tb/room-tb.module';
import { BookingTbModule } from './booking-tb/booking-tb.module';

const REUSE_LIST = [
  UserTbModule,
  CommentTbModule,
  RoomTbModule,
  BookingTbModule,
];
@Module({
  imports: [...REUSE_LIST],
  exports: [...REUSE_LIST],
})
export class ServiceModule {}
