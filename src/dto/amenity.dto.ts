import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { DeviceDto } from './device.dto';
import { Device } from '@/utils/types';

export class AmenityDto {
  @ApiProperty({ type: String })
  ID: string;

  @ApiProperty({ type: String })
  Type: string;

  @ApiProperty({ type: Array<DeviceDto> })
  Devides: DeviceDto[];
}

export class CreateAmenityDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Loại tiện nghi không được để trống' })
  Type: string;
}

// export class CreateAmenityParams {
//   @ApiProperty({ type: String })
//   @IsNotEmpty({ message: 'Loại tiện nghi không được để trống' })
//   Type: string;

//   @ApiProperty({ type: Array<Device> })
//   @IsNotEmpty({ message: 'Danh sách thiết bị không được để trống' })
//   Devices: Device[];
// }

export class UpdateAmenityDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã loại tiện nghi không được để trống' })
  ID: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Loại tiện nghi không được để trống' })
  Type: string;

  @ApiProperty({ type: Object })
  @IsNotEmpty({ message: 'Danh sách mã thiết bị không được để trống' })
  DeviceIdList: string[];
}

export class UpdateAmenityParams {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã loại tiện nghi không được để trống' })
  ID: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Loại tiện nghi không được để trống' })
  Type: string;

  @ApiProperty({ type: Object })
  @IsNotEmpty({ message: 'Danh sách mã thiết bị không được để trống' })
  Devices: Device[];
}
