import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GeneralDataDeviceDto {
  @ApiProperty({ type: String })
  IpAddress: string;

  @ApiProperty({ type: String })
  Description: string;

  @ApiProperty({ type: Boolean })
  IsServer: boolean;
}
export class CreateDeviceDto extends GeneralDataDeviceDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Imei không được để trống' })
  Imei: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Thông tin bãi xe không được để trống' })
  ParkingId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Port không được để trống' })
  Port: string;
}

export class UpdateDeviceDto extends GeneralDataDeviceDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'ID không được để trống' })
  ID: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Thông tin bãi xe không được để trống' })
  ParkingId: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Imei không được để trống' })
  Imei: string;

  @ApiProperty({ type: Boolean })
  IsInsert?: boolean;
}

export class UpdateIpByApp {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Imei không được để trống' })
  Imei: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'IpAddress không được để trống' })
  IpAddress: string;
}
