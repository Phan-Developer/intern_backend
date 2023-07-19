import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateKeyRoleDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Từ khóa không được để trống' })
  KeyWork: string;

  @ApiProperty({ type: String })
  Description: string;
}

export class UpdateKeyRoleDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Từ khóa không được để trống' })
  KeyWork: string;

  @ApiProperty({ type: String })
  Description: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã công ty không được để trống' })
  ID: string;
}
