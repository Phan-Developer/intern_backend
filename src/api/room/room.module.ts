import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomTbModule } from '@/service/room-tb/room-tb.module';

@Module({
  imports: [RoomTbModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
