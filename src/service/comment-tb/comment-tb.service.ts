import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '@/entities/Comment.entity';
import { Repository } from 'typeorm';
import { UserTbService } from '../user-tb/user-tb.service';
import { RoomTbService } from '../room-tb/room-tb.service';

export interface CreateCommentParams {
  RoomId: string;
  UserId: string;
  RatingValue: number;
  Content: string;
}

export interface UpdateCommentParams {
  RatingValue?: number;
  Content?: string;
}

export interface Pagination {
  page: number;
  take: number;
}

@Injectable()
export class CommentTbService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    private readonly userTbService: UserTbService,
    private readonly roomTbService: RoomTbService,
  ) {}

  async findById(id: string) {
    return this.commentRepository.findOne({ where: { ID: id } });
  }

  async findAll(pagination: Pagination) {
    const skip = (pagination.page - 1) * pagination.take;
    const totalComment = await this.commentRepository.count();
    const totaPage = Math.ceil(totalComment / pagination.take);

    const comments = await this.commentRepository.find({
      take: pagination.take,
      skip: skip,
    });
    return {
      currentPage: pagination.page,
      take: pagination.take,
      totalComment: totalComment,
      totaPage: totaPage,
      comments,
    };
  }

  async create(
    createCommentParams: CreateCommentParams,
  ): Promise<CommentEntity> {
    const room = await this.roomTbService.findById(createCommentParams.RoomId);
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }

    const user = await this.userTbService.findById(createCommentParams.UserId);
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    const createComment = await this.commentRepository.create({
      UserId: user,
      RoomId: room,
      RatingValue: createCommentParams.RatingValue,
      Content: createCommentParams.Content,
    });

    return await this.commentRepository.save(createComment);
  }

  async update(
    commentId: string,
    updateCommentParams: UpdateCommentParams,
    userId: string,
  ) {
    const comment = await this.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Không tìm thấy comment');
    }
    const user = await this.userTbService.findById(userId);
    if (comment.UserId !== user) {
      throw new HttpException(
        'Bạn không có quyền xoá bình luận này',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (updateCommentParams.RatingValue) {
      comment.RatingValue = updateCommentParams.RatingValue;
    }
    if (updateCommentParams.Content) {
      comment.Content = updateCommentParams.Content;
    }
    return await this.commentRepository.save(comment);
  }

  async delete(id: string) {
    const comment = await this.commentRepository.findOne({ where: { ID: id } });
    if (!comment) {
      throw new NotFoundException('Không tìm thây comment');
    }
    return await this.commentRepository.softDelete(id);
  }
}
