import { UserTbModule } from '@/service/user-tb/user-tb.module';
import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [UserTbModule],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
