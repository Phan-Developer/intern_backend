import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  Title: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  Description: string;

  @ApiProperty({ type: Object })
  Images?: string[];

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  Address: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Vĩ độ không được để trống' })
  Latitude: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Vĩ độ không được để trống' })
  Longtitude: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: 'Số người không được để trống' })
  Guests: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: 'Số phòng ngủ không được để trống' })
  Bedroom: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: ' Số giường ngủ không được để trống' })
  Beds: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: ' Số giường ngủ không được để trống' })
  Price: number;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã loại phòng không được để trống' })
  TypeRoomId: string;
}

export class UpdateRoomDto {
  @ApiProperty({ type: String })
  ID?: string;

  @ApiProperty({ type: String })
  Title?: string;

  @ApiProperty({ type: String })
  Description: string;

  @ApiProperty({ type: Object })
  Images: string[];

  @ApiProperty({ type: String })
  Address: string;

  @ApiProperty({ type: String })
  Latitude: string;

  @ApiProperty({ type: String })
  Longtitude: string;

  @ApiProperty({ type: Number })
  Guests: number;

  @ApiProperty({ type: Number })
  Bedroom: number;

  @ApiProperty({ type: Number })
  Beds: number;

  @ApiProperty({ type: Number })
  Price: number;

  @ApiProperty({ type: Boolean })
  IsBooking: boolean;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Mã loại phòng không được để trống' })
  TypeRoomId: string;
}
