import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GeneralDataSystemRole {
  @ApiProperty({ type: Boolean })
  IsRead: boolean;

  @ApiProperty({ type: Boolean })
  IsDelete: boolean;

  @ApiProperty({ type: Boolean })
  IsInsert: boolean;

  @ApiProperty({ type: Boolean })
  IsUpdate: boolean;
}
export class CreateSystemRoleDto extends GeneralDataSystemRole {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã chức năng không được để trống' })
  KeyRoleId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã nhóm quyền không được để trống' })
  GroupRoleId: string;
}

export class UpdateSystemRoleDto extends GeneralDataSystemRole {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Mã chức năng không được để trống' })
  KeyRoleId: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Mã nhóm quyền không được để trống' })
  GroupRoleId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã nhóm quyền không được để trống' })
  ID: string;
}
