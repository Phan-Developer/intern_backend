import { Module } from '@nestjs/common';
import { RoomTbService } from './room-tb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from '@/entities/Room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  providers: [RoomTbService],
  exports: [RoomTbService],
})
export class RoomTbModule {}
