import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  ID: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'ID phòng không được để trống' })
  RoomId: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: 'Bạn phải đánh giá số sao' })
  RatingValue: number;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Bạn phải để lại đánh giá' })
  Content: string;
}

export class UpdateCommentDto {
  @IsUUID()
  ID: string;

  @ApiProperty({ type: Number })
  @IsOptional()
  RatingValue?: number;

  @ApiProperty({ type: String })
  @IsOptional()
  Content?: string;
}
