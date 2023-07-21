import { Module } from '@nestjs/common';
import { UserTbModule } from './user-tb/user-tb.module';
import { TypeRoomTbModule } from './type-room-tb/type-room-tb.module';
import { AmenityTbModule } from './amenity-tb/amenity-tb.module';
import { DeviceTbModule } from './device-tb/device-tb.module';
import { NotificationTbModule } from './notification-tb/notification-tb.module';

const REUSE_LIST = [
  UserTbModule,
  TypeRoomTbModule,
  AmenityTbModule,
  DeviceTbModule,
  NotificationTbModule,
];
@Module({
  imports: [...REUSE_LIST],
  exports: [...REUSE_LIST],
})
export class ServiceModule {}
