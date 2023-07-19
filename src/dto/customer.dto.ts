import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class GeneralDataCustomerDto {
  @ApiProperty({ type: String })
  Email?: string;

  @ApiProperty({ type: String })
  CompanyId?: string;

  @ApiProperty({ type: String })
  Province?: string;

  @ApiProperty({ type: String })
  District?: string;

  @ApiProperty({ type: String })
  Wards?: string;

  @ApiProperty({ type: String })
  Address?: string;

  @ApiProperty({ type: String })
  Status?: string;

  @ApiProperty({ type: String })
  Avatar?: string;
}
export class CreateCustomerDto extends GeneralDataCustomerDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  FullName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsPhoneNumber('VN', { message: 'Số điện thoại không đúng định dạng' })
  @Transform(({ value }) => value.replace(/\D/g, '')) // remove all character except number
  PhoneNumber: string;
}

export class UpdateCustomerDto extends GeneralDataCustomerDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'ID không được để trống' })
  ID: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  FullName: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsPhoneNumber('VN', { message: 'Số điện thoại không đúng định dạng' })
  @Transform(({ value }) => value.replace(/\D/g, '')) // remove all character except number
  PhoneNumber: string;
}
