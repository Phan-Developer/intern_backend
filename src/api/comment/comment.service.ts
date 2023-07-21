import { UpdateCommentDto } from '@/dto/Comment.dto';
import {
  CommentTbService,
  CreateCommentParams,
  Pagination,
} from '@/service/comment-tb/comment-tb.service';
import { UserTbService } from '@/service/user-tb/user-tb.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentTbService: CommentTbService,
    private readonly userTbService: UserTbService,
  ) {}

  async getComment(pagination: Pagination) {
    console.log('object');
    return this.commentTbService.findAll(pagination);
  }

  async create(createCommentParams: CreateCommentParams) {
    return await this.commentTbService.create(createCommentParams);
  }

  async updateComment(
    commentId: string,
    updateCommentDto: UpdateCommentDto,
    userId: string,
  ) {
    const user = await this.userTbService.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.commentTbService.update(
      commentId,
      updateCommentDto,
      userId,
    );
  }

  async delete(id: string): Promise<string> {
    await this.commentTbService.delete(id);
    return 'Xoá bình luận thành công';
  }
}
