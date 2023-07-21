import { Module } from '@nestjs/common';
import { AmenityService } from './amenity.service';
import { AmenityController } from './amenity.controller';
import { AmenityTbModule } from '@/service/amenity-tb/amenity-tb.module';
import { DeviceTbModule } from '@/service/device-tb/device-tb.module';

@Module({
  imports: [AmenityTbModule, DeviceTbModule],
  controllers: [AmenityController],
  providers: [AmenityService],
  exports: [AmenityService],
})
export class AmenityModule {}
