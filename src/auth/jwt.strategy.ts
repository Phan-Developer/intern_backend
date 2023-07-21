import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GLOBAL, Roles } from '@/utils/index';
import { InjectRepository } from '@nestjs/typeorm';
import { RefeshTokenEntity } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(RefeshTokenEntity)
    private refeshTokenRepository: Repository<RefeshTokenEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: GLOBAL.G_JWT_KEY_ACCESS_TOKEN,
    });
  }

  async validate(payload: {
    email: string;
    id: string;
    phone: string;
    role: Roles;
    iat: number;
    exp: number;
    rf_token: string;
  }) {
    const rf_token = await this.refeshTokenRepository.findOne({
      where: { ID: payload.rf_token },
    });

    if (!rf_token) {
      throw new UnauthorizedException('R_TOKEN_NOT_EXIST');
    }

    const rf_token_date = new Date(rf_token.Expired);
    const access_token_date = new Date(payload.exp);
    const current_date = new Date();

    if (current_date.getTime() > rf_token_date.getTime()) {
      throw new UnauthorizedException('R_TOKEN_EXPIRED');
    }

    if (current_date.getTime() > access_token_date.getTime()) {
      throw new UnauthorizedException('A_TOKEN_EXPIRED');
    }

    return {
      ID: payload.id,
      Email: payload.email,
      Phone: payload.phone,
      Role: payload.role,
    };
  }
}
