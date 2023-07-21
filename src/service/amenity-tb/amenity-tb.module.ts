import { Module } from '@nestjs/common';
import { AmenityTbService } from './amenity-tb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmenityEntity } from '@/entities/amenity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AmenityEntity])],
  providers: [AmenityTbService],
  exports: [AmenityTbService],
})
export class AmenityTbModule {}
