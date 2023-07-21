import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto, UpdateCommentDto } from '@/dto/Comment.dto';
import { query } from 'express';
import { Pagination } from '@/service/comment-tb/comment-tb.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiTags('comment')
  @Get()
  async getComment(
    @Query('page') page: number | undefined,
    @Query('take') take: number | undefined,
  ) {
    const defaultPage = 1;
    const defaultTake = 5;
    const pagination = {
      page: page !== undefined ? page : defaultPage,
      take: take !== undefined ? take : defaultTake,
    } as Pagination;
    return await this.commentService.getComment(pagination);
  }

  @ApiTags('comment')
  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create({
      ...createCommentDto,
      UserId: 'b0f2004c-cd44-40cf-b026-e01e3845d59d',
      RoomId: '1eb340b3-1605-45f4-a10e-ad0c01582c18',
    });
  }

  @ApiTags('comment')
  @Put(':id')
  async editComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const userId = '231312312';
    return await this.commentService.updateComment(
      id,
      updateCommentDto,
      userId,
    );
  }

  @ApiTags('comment')
  @Delete(':id')
  async deleteComment(@Param('id', ParseUUIDPipe) id: string) {
    return await this.commentService.delete(id);
  }
}
