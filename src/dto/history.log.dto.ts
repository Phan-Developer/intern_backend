import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateHistoryLogDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'Hành động không được để trống' })
  Action: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'thông tin bảng thay đổi không được để trống' })
  TableName: string;

  @ApiProperty({ type: String })
  Description: string;
}
