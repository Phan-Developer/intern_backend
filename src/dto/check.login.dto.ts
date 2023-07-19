import { ApiProperty } from '@nestjs/swagger';

export class CheckLogin {
  @ApiProperty({ type: String })
  Phone: string;

  @ApiProperty({ type: String })
  Imei: string;
}
