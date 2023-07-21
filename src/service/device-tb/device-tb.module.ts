import { Module } from '@nestjs/common';
import { DeviceTbService } from './device-tb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceEntity } from '@/entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity])],
  providers: [DeviceTbService],
  exports: [DeviceTbService],
})
export class DeviceTbModule {}
