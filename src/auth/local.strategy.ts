import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'Phone' });
  }

  async validate(Phone: string, password: string) {
    const user = await this.authService.validateUser(Phone, password);
    if (!user) {
      throw new UnauthorizedException('USER_NOT_VALIDATE');
    } else {
      return user;
    }
  }
}
