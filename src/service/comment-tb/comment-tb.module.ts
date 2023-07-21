import { Module } from '@nestjs/common';
import { CommentTbService } from './comment-tb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '@/entities/Comment.entity';
import { UserTbModule } from '../user-tb/user-tb.module';
import { RoomTbModule } from '../room-tb/room-tb.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    UserTbModule,
    RoomTbModule,
  ],
  providers: [CommentTbService],
  exports: [CommentTbService],
})
export class CommentTbModule {}
