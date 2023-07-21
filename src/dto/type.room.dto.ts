import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTypeRoomDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tên loại phòng không được để trống' })
  Type: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  Description: string;
}

export class UpdateTypeRoomDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Loại phòng không được để trống' })
  Type: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  Description: string;
}
