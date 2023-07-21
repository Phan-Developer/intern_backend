import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: 'Bạn phải đánh giá số sao' })
  RatingValue: number;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Bạn phải để lại đánh giá' })
  Content: string;
}

export class UpdateCommentDto {
  @ApiProperty({ type: Number })
  @IsOptional()
  RatingValue?: number;

  @ApiProperty({ type: String })
  @IsOptional()
  Content?: string;
}
