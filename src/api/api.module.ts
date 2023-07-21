import { Module } from '@nestjs/common';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UserModule } from './user/user.module';
import { WebsocketModule } from './websocket/websocket.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ProfileModule } from './profile/profile.module';
import { CommentModule } from './comment/comment.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { AmenityModule } from './amenity/amenity.module';
import { DeviceModule } from './device/device.module';
import { NotificationModule } from './notification/notification.module';
import { TypeRoomModule } from './type-room/type-room.module';

const REUSE_LIST = [
  UploadFileModule,
  UserModule,
  WebsocketModule,
  LoginModule,
  RegisterModule,
  ProfileModule,
  CommentModule,
  RoomModule,
  BookingModule,
  AmenityModule,
  DeviceModule,
  NotificationModule,
  TypeRoomModule,
];

@Module({
  imports: [...REUSE_LIST],
  exports: [...REUSE_LIST],
})
export class ApiModule {}
