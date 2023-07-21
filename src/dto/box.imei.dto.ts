import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GeneralDataBoxImeiDto {
  @ApiProperty({ type: Date })
  ProductionDate: Date;

  @ApiProperty({ type: Date })
  ActivationDate: Date;

  @ApiProperty({ type: Date })
  WarrantyExpirationDate: Date;

  @ApiProperty({ type: String })
  ParkingId: string;

  @ApiProperty({ type: String })
  Description: string;

  @ApiProperty({ type: String })
  Status: string;
}
export class CreateBoxImeiDto extends GeneralDataBoxImeiDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Imei không được để trống' })
  Imei: string;
}

export class UpdateBoxImeiDto extends GeneralDataBoxImeiDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'ID không được để trống' })
  ID: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Imei không được để trống' })
  Imei: string;
}
