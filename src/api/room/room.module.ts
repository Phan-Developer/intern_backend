import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomTbModule } from '@/service/room-tb/room-tb.module';
import { TypeRoomTbModule } from '@/service/type-room-tb/type-room-tb.module';
import { UploadFileModule } from '../upload-file/upload-file.module';

@Module({
  imports: [RoomTbModule, TypeRoomTbModule, UploadFileModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
