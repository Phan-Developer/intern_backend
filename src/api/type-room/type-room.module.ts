import { Module } from '@nestjs/common';
import { TypeRoomService } from './type-room.service';
import { TypeRoomController } from './type-room.controller';
import { TypeRoomTbModule } from '@/service/type-room-tb/type-room-tb.module';

@Module({
  imports: [TypeRoomTbModule],
  controllers: [TypeRoomController],
  providers: [TypeRoomService],
  exports: [TypeRoomService],
})
export class TypeRoomModule {}
