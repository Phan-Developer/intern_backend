import { Module } from '@nestjs/common';
import { TypeRoomTbService } from './type-room-tb.service';
import { TypeRoomEntity } from '@/entities/type.room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TypeRoomEntity])],
  providers: [TypeRoomTbService],
  exports: [TypeRoomTbService],
})
export class TypeRoomTbModule {}
