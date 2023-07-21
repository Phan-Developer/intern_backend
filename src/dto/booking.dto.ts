import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Phòng không được để trống' })
  RoomId: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty({ message: 'Ngày vào không được để trống' })
  ArrivalDate: Date;
}

export class UpdateBookingDto {
  // @ApiProperty({ type: String })
  // @IsNotEmpty({ message: 'Phòng không được để trống' })
  // RoomId: string;

  // @ApiProperty({ type: String })
  // @IsNotEmpty({ message: 'Người dùng không được để trống' })
  // UserId: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty({ message: 'CheckIn không được để trống' })
  @IsDate({ message: 'CheckIn phỏi là định dạng ngày' })
  CheckIn?: Date;

  @ApiProperty({ type: Date })
  @IsOptional()
  CheckOut?: Date;

  @ApiProperty({ type: Number })
  @IsOptional()
  TotalMoney?: number;

  @ApiProperty({ type: Boolean })
  @IsOptional()
  Status?: boolean;
}
