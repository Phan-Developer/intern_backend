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
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto, UpdateCommentDto } from '@/dto/Comment.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { RolesGuard } from '@/auth/roles.guard';
import { Roles } from '@/auth/roles.decorator';
import { Roles as roles } from '@/utils/variable';
import { Pagination } from '@/utils/types';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiTags('comment')
  @Get()
  async getComment(
    @Query('page') page: number | undefined,
    @Query('size') size: number | undefined,
  ) {
    const defaultPage = 1;
    const defaultSize = 5;
    const pagination = {
      page: page !== undefined ? page : defaultPage,
      size: size !== undefined ? size : defaultSize,
    } as Pagination;
    return await this.commentService.getComment(pagination);
  }

  @ApiBearerAuth()
  @ApiTags('comment')
  @Post()
  @Roles(roles.USER, roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: any,
  ) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.commentService.create({
      ...createCommentDto,
      UserId: req.user.ID,
    });
  }

  @ApiBearerAuth()
  @ApiTags('comment')
  @Roles(roles.USER, roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  async editComment(
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req: any,
  ) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return await this.commentService.updateComment(
      updateCommentDto,
      req.user.ID,
    );
  }

  @ApiBearerAuth()
  @ApiTags('comment')
  @Roles(roles.USER, roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
  ) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return await this.commentService.delete(id, req.user.ID);
  }
}
