import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { DeviceTbModule } from '@/service/device-tb/device-tb.module';
import { AmenityTbModule } from '@/service/amenity-tb/amenity-tb.module';

@Module({
  imports: [DeviceTbModule, AmenityTbModule],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}
