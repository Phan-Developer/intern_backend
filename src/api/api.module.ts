import { Module } from '@nestjs/common';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UserModule } from './user/user.module';
import { WebsocketModule } from './websocket/websocket.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ProfileModule } from './profile/profile.module';

const REUSE_LIST = [
  UploadFileModule,
  UserModule,
  WebsocketModule,
  LoginModule,
  RegisterModule,
  ProfileModule,
];

@Module({
  imports: [...REUSE_LIST],
  exports: [...REUSE_LIST],
})
export class ApiModule {}
