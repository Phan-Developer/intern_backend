import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserTbModule } from '@/service/user-tb/user-tb.module';
import { UploadFileModule } from '../upload-file/upload-file.module';

@Module({
  imports: [UserTbModule, UploadFileModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
