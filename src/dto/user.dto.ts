import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class UserLogin {
  @ApiProperty({ type: String })
  Phone: string;

  @ApiProperty({ type: String })
  Password: string;
}

export class GeneralDataUserDto {
  @ApiProperty({ type: Boolean })
  IsLoginCloud?: boolean;
}

export class UserRegister extends GeneralDataUserDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsEmail()
  Email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  Password: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsPhoneNumber('VN', { message: 'Số điện thoại không đúng định dạng' })
  @Transform(({ value }) => value.replace(/\D/g, '')) // remove all character except number
  Phone: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  Address: string;
}

export class UserUpdate extends GeneralDataUserDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsEmail()
  Email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'ID không được để trống' })
  ID: string;

  @ApiProperty({ type: String })
  Password?: string;

  @ApiProperty({ type: String })
  Avatar?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsPhoneNumber('VN', { message: 'Số điện thoại không đúng định dạng' })
  @Transform(({ value }) => value.replace(/\D/g, '')) // remove all character except number
  Phone: string;
}
