import { Module } from '@nestjs/common';
import { UserTbService } from './user-tb.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserTbService],
  exports: [UserTbService],
})
export class UserTbModule {}
