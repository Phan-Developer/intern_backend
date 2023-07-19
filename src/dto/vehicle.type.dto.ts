import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GeneralDataVehicleType {
  @ApiProperty({ type: String })
  Description: string;

  @ApiProperty({ type: Boolean })
  IsDelete: boolean;
}
export class CreateVehicleTypeDto extends GeneralDataVehicleType {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã bãi xe không được để trống' })
  ParkingId: string;
}

export class UpdateVehicleTypeDto extends GeneralDataVehicleType {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Mã bãi xe không được để trống' })
  ParkingId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã loại xe không được để trống' })
  ID: string;
}

export class VehicleTypeUpdateSynchronized {
  @ApiProperty({ type: String })
  ID: string;

  @ApiProperty({ type: Boolean })
  IsInsert: boolean;

  @ApiProperty({ type: Boolean })
  IsUpdate: boolean;
}
