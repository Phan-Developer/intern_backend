import { User } from '@/utils/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNotifyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tiêu đề thông báo không được để trống' })
  Title: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Nội dung thông báo không được để trống' })
  Content: string;
}

export class CreateNotifyParams {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tiêu đề thông báo không được để trống' })
  Title: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Nội dung thông báo không được để trống' })
  Content: string;

  @ApiProperty({ type: Object })
  @IsNotEmpty({ message: 'Thông tin người dùng không được để trống' })
  UserId: User;
}

export class UpdateNotifyDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Tiêu đề thông báo không được để trống' })
  Title: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Nội dung thông báo không được để trống' })
  Content: string;
}

export class UpdateNotifyParams {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Tiêu đề thông báo không được để trống' })
  Title: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Nội dung thông báo không được để trống' })
  Content: string;

  @ApiProperty({ type: Object })
  @IsNotEmpty({ message: 'Thông tin người dùng không được để trống' })
  UserId: User;
}
