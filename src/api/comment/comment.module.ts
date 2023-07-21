import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentTbModule } from '@/service/comment-tb/comment-tb.module';
import { UserTbModule } from '@/service/user-tb/user-tb.module';

@Module({
  imports: [CommentTbModule, UserTbModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
