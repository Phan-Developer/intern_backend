import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGroupRoleDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã khách hàng không được để trống' })
  CustomerId: string;

  @ApiProperty({ type: Boolean })
  IsCreateUser: boolean;

  @ApiProperty({ type: String })
  Description: string;
}

export class UpdateGroupRoleDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Mã khách hàng không được để trống' })
  CustomerId: string;

  @ApiProperty({ type: Boolean })
  IsCreateUser: boolean;

  @ApiProperty({ type: String })
  Description: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã nhóm quyền không được để trống' })
  ID: string;
}
