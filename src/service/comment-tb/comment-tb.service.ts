import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '@/entities/Comment.entity';
import { Repository } from 'typeorm';
import {
  CreateCommentParams,
  Pagination,
  UpdateCommentParams,
} from '@/utils/types';
import { RoomEntity } from '@/entities/Room.entity';
import { UserEntity } from '@/entities/user.entity';

@Injectable()
export class CommentTbService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async findById(id: string) {
    return this.commentRepository.findOne({ where: { ID: id } });
  }

  async findAll(pagination: Pagination) {
    const skip = (pagination.page - 1) * pagination.size;
    const totalComment = await this.commentRepository.count();

    const comments = await this.commentRepository.find({
      take: pagination.size,
      skip: skip,
      order: { CreatedAt: 'DESC' },
    });
    return {
      currentPage: pagination.page,
      totalComment: totalComment,
      comments,
    };
  }

  async create(
    createCommentParams: CreateCommentParams,
    room: RoomEntity,
    user: UserEntity,
  ): Promise<CommentEntity> {
    const createComment = await this.commentRepository.create({
      RoomId: room,
      UserId: user,
      RatingValue: createCommentParams.RatingValue,
      Content: createCommentParams.Content,
    });

    return await this.commentRepository.save(createComment);
  }

  async update(updateCommentParams: UpdateCommentParams, user: UserEntity) {
    const comment = await this.findById(updateCommentParams.ID);
    if (!comment) {
      throw new NotFoundException('Không tìm thấy comment');
    }

    if (comment.UserId !== user) {
      throw new HttpException(
        'Bạn không có quyền cập nhật bình luận này',
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

  async delete(id: string, user: UserEntity) {
    const comment = await this.commentRepository.findOne({ where: { ID: id } });
    if (!comment) {
      throw new NotFoundException('Không tìm thây comment');
    }

    if (comment.UserId !== user && user.Role === 'USER') {
      throw new HttpException(
        'Bạn không có quyền xoá bình luận này',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.commentRepository.softDelete(id);
  }
}
