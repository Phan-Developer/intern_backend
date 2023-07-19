import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { RefeshTokenEntity } from '@/entities/refesh.token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTbModule } from '@/service/user-tb/user-tb.module';
import { UserModule } from '@/api/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefeshTokenEntity]),
    PassportModule,
    UserTbModule,
    JwtModule.register({}),
    UserModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
