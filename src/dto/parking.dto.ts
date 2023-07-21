import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GeneralDataParking {
  @ApiProperty({ type: String })
  Address: string;

  @ApiProperty({ type: String })
  Description: string;

  @ApiProperty({ type: String })
  Province: string;

  @ApiProperty({ type: String })
  District: string;

  @ApiProperty({ type: String })
  Ward: string;
}
export class CreateParkingDto extends GeneralDataParking {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'thông tin khách hàng không được để trống' })
  CustomerId: string;
}

export class UpdateParkingDto extends GeneralDataParking {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'ID không được để trống' })
  ID: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  Name: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'thông tin khách hàng không được để trống' })
  CustomerId: string;
}
