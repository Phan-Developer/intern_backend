import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefeshTokenEntity, UserEntity } from '../entities';
import { GLOBAL } from '../utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JWTPayload } from '../dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserTbService } from '@/service/user-tb/user-tb.service';
import { UserService } from '@/api/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserTbService,
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(RefeshTokenEntity)
    private refeshTokenRepository: Repository<RefeshTokenEntity>,
  ) {}

  async validateUser(Phone: string, password: string): Promise<any> {
    const user = await this.usersService.findByPhone(Phone);
    if (!user) {
      throw new UnauthorizedException('USER_NOT_EXIST');
    }
    if (await bcrypt.compare(password, user.Password)) {
      const { Password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    user,
    client_data: {
      os: { name: string; version: string };
      browser: { name: string; version: string };
      device: string;
      ip: string;
    },
  ) {
    const toDay = new Date();
    const expiredAt_Refesh_Token = toDay.getTime() + 365 * 24 * 60 * 60 * 1000;
    const expiredAt_Access_Token = toDay.getTime() + 24 * 60 * 60 * 1000;

    const rf_token = this.refeshTokenRepository.create({
      Ip: client_data.ip,
      Os: client_data.os
        ? client_data.os.name + ' ' + client_data.os.version
        : null,
      Browser: client_data.browser
        ? client_data.browser.name + ' ' + client_data.browser.version
        : null,
      Device: client_data.device,
      Expired: expiredAt_Refesh_Token.toString(),
      UserCreate: user,
    });

    const token = await this.refeshTokenRepository.save(rf_token);

    const payload = {
      email: user.Email,
      id: user.ID.toString(),
      phone: user.Phone,
      rf_token: token.ID,
    };
    const Refeshtoken = await this.jwtService.sign(
      { rf_token_Id: token.ID },
      {
        secret: GLOBAL.JWT_KEY_REFESH_TOKEN,
        expiresIn: expiredAt_Refesh_Token,
      },
    );

    const accessToken = await this.jwtService.sign(payload, {
      secret: GLOBAL.G_JWT_KEY_ACCESS_TOKEN,
      expiresIn: expiredAt_Access_Token,
    });

    return {
      refeshtoken: Refeshtoken,
      refeshtokenExprire: expiredAt_Refesh_Token,
      accessToken: accessToken,
      accesstokenExprire: expiredAt_Access_Token,
    };
  }

  async renewAccessToken(token: string) {
    let data: any = null;
    try {
      data = await this.jwtService.verify(token, {
        secret: GLOBAL.JWT_KEY_REFESH_TOKEN,
      });
    } catch {
      return { message: 'R_TOKEN_INVALIDATE' };
    }

    const { rf_token_Id } = data;
    const rf_token = await this.refeshTokenRepository.findOne({
      where: {
        ID: rf_token_Id,
      },
      relations: ['UserCreate'],
    });
    if (rf_token) {
      const user = rf_token.UserCreate;

      const toDay = new Date();
      if (Number(rf_token.Expired) < toDay.getTime()) {
        this.refeshTokenRepository.delete(rf_token.ID);
        return { message: 'R_TOKEN_EXPIRED' };
      }

      const expiredAt_Access_Token = toDay.getTime() + 24 * 60 * 60 * 1000;
      const expired =
        expiredAt_Access_Token > Number(rf_token.Expired)
          ? Number(rf_token.Expired)
          : expiredAt_Access_Token;
      const payload = {
        email: user.Email,
        id: user.ID.toString(),
        phone: user.Phone,
        rf_token: rf_token.ID,
      };
      const accessToken = await this.jwtService.sign(payload, {
        secret: GLOBAL.G_JWT_KEY_ACCESS_TOKEN,
        expiresIn: expired,
      });
      return { message: 'RENEW_SUCCESS', accessToken, expired };
    } else {
      return { message: 'R_TOKEN_NOT_EXIST' };
    }
  }

  async logout(token) {
    let data: any = null;
    try {
      data = await this.jwtService.verify(token, {
        secret: GLOBAL.JWT_KEY_REFESH_TOKEN,
      });
    } catch {
      return { message: 'R_TOKEN_INVALIDATE' };
    }

    const { rf_token_Id } = data;
    return this.refeshTokenRepository.delete(rf_token_Id);
  }

  async getLoginStatusOne(payload: JWTPayload, token: string) {
    let data: any = null;
    try {
      data = await this.jwtService.verify(token, {
        secret: GLOBAL.JWT_KEY_REFESH_TOKEN,
      });
    } catch {
      return { message: 'R_TOKEN_INVALIDATE' };
    }

    const { rf_token_Id } = data;

    const user = await this.usersService.findById(payload.ID);

    const result = (
      await this.refeshTokenRepository.find({
        where: { UserCreate: { ID: user.ID } },
      })
    ).map((token) => ({ ...token, ['current']: token.ID === rf_token_Id }));

    return result;
  }

  async getLoginStatusAll(token: string) {
    let data: any = null;
    try {
      data = await this.jwtService.verify(token, {
        secret: GLOBAL.JWT_KEY_REFESH_TOKEN,
      });
    } catch {
      return { message: 'R_TOKEN_INVALIDATE' };
    }

    const { rf_token_Id } = data;

    const result = (await this.refeshTokenRepository.find({})).map((token) => ({
      ...token,
      ['current']: token.ID === rf_token_Id,
    }));

    return result;
  }

  // @Cron(CronExpression.EVERY_HOUR)
  // async checkRftokenDialy() {
  //     const date = new Date();
  //     const time = date.getTime();

  //     const queryBuilder = this.refeshTokenRepository.createQueryBuilder('user');
  //     const tokenToDelete = await queryBuilder
  //         .where('CAST(RefeshToken.Expired AS UNSIGNED) > :time', { time })
  //         .getMany();
  //     await this.refeshTokenRepository.delete(tokenToDelete.map((t) => t.ID));
  // }

  @Cron(CronExpression.EVERY_HOUR)
  async checkRftokenDialy() {
    const date = new Date();
    const time = date.getTime();

    const tokens = await this.refeshTokenRepository.find({});

    const token_expired = tokens.filter(
      (token) => Number(token.Expired) < time,
    );
    if (token_expired.length > 0) {
      await this.refeshTokenRepository.delete(token_expired.map((t) => t.ID));
    }

    // const queryBuilder = this.refeshTokenRepository.createQueryBuilder('user');
    // const tokenToDelete = await queryBuilder
    //     .where('CAST(RefeshToken.Expired AS UNSIGNED) > :time', { time })
    //     .getMany();
  }
}
