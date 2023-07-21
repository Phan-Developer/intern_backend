import { Module } from '@nestjs/common';
import { NotificationTbService } from './notification-tb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from '@/entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  providers: [NotificationTbService],
  exports: [NotificationTbService],
})
export class NotificationTbModule {}
