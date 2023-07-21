import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'Phone', passwordField: 'Password' });
  }

  async validate(Phone: string, Password: string) {
    const user = await this.authService.validateUser(Phone, Password);
    if (!user) {
      throw new UnauthorizedException('USER_NOT_VALIDATE');
    } else {
      return user;
    }
  }
}
