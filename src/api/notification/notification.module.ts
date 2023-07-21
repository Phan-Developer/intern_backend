import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationTbModule } from '@/service/notification-tb/notification-tb.module';
import { UserTbModule } from '@/service/user-tb/user-tb.module';

@Module({
  imports: [NotificationTbModule, UserTbModule],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
