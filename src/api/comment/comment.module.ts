import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentTbModule } from '@/service/comment-tb/comment-tb.module';
import { UserTbModule } from '@/service/user-tb/user-tb.module';
import { RoomTbModule } from '@/service/room-tb/room-tb.module';

@Module({
  imports: [CommentTbModule, UserTbModule, RoomTbModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
