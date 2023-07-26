import { UpdateCommentDto } from '@/dto/Comment.dto';
import { CommentTbService } from '@/service/comment-tb/comment-tb.service';
import { RoomTbService } from '@/service/room-tb/room-tb.service';
import { UserTbService } from '@/service/user-tb/user-tb.service';
import { CreateCommentParams, Pagination } from '@/utils/types';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentTbService: CommentTbService,
    private readonly userTbService: UserTbService,
    private readonly roomTbService: RoomTbService,
  ) {}

  async getComment(pagination: Pagination) {
    return this.commentTbService.findAll(pagination);
  }

  async create(createCommentParams: CreateCommentParams) {
    const room = await this.roomTbService.findById(createCommentParams.RoomId);
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }

    const user = await this.userTbService.findById(createCommentParams.UserId);
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    return await this.commentTbService.create(createCommentParams, room, user);
  }

  async updateComment(updateCommentDto: UpdateCommentDto, userId: string) {
    const user = await this.userTbService.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.commentTbService.update(updateCommentDto, user);
  }

  async delete(id: string, userId: string): Promise<string> {
    const user = await this.userTbService.findById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    await this.commentTbService.delete(id, user);
    return 'Xoá bình luận thành công';
  }
}
