import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Amenity } from '../utils';

// new
export class DeviceDto {
  @ApiProperty({ type: String })
  ID: string;

  @ApiProperty({ type: String })
  Name: string;

  @ApiProperty({ type: Object })
  Amenity: Amenity;
}

export class CreateDeviceDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tên thiết bị không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã loại tiện nghi không được để trống' })
  AmenityId: string;
}

export class CreateDeviceParams {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tên thiết bị không được để trống' })
  Name: string;

  @ApiProperty({ type: Object })
  @IsNotEmpty({ message: 'Mã loại tiện nghi không được để trống' })
  Amenity: Amenity;
}

export class UpdateDeviceDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Tên thiết bị không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã loại tiện nghi không được để trống' })
  AmenityId: string;
}

export class UpdateDeviceParams {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Tên thiết bị không được để trống' })
  Name: string;

  @ApiProperty({ type: Object })
  @IsNotEmpty({ message: 'Mã loại tiện nghi không được để trống' })
  Amenity: Amenity;
}
