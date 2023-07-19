import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefeshTokenEntity } from '@/entities/refesh.token.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RefeshTokenEntity]), AuthModule],
  controllers: [LoginController],
})
export class LoginModule {}
