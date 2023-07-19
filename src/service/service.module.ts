import { Module } from '@nestjs/common';
import { UserTbModule } from './user-tb/user-tb.module';

const REUSE_LIST = [UserTbModule];
@Module({
  imports: [...REUSE_LIST],
  exports: [...REUSE_LIST],
})
export class ServiceModule {}
