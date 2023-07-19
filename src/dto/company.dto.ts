import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GeneralDataCompanyDto {
  @ApiProperty({ type: String })
  Logo: string;

  @ApiProperty({ type: String })
  Background: string;

  @ApiProperty({ type: String })
  Website: string;
}
export class CreateCompanyDto extends GeneralDataCompanyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;
}

export class UpdateCompanyDto extends GeneralDataCompanyDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã công ty không được để trống' })
  ID: string;
}
