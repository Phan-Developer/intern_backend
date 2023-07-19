import { RefeshTokenEntity } from '@/entities/refesh.token.entity';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Repository } from 'typeorm';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller()
export class LoginController {
  constructor(
    private authService: AuthService,
    @InjectRepository(RefeshTokenEntity)
    private refeshTokenRepository: Repository<RefeshTokenEntity>,
  ) {}

  @ApiTags('Auth')
  @UseGuards(JwtAuthGuard)
  @Get('login-status-all/:token')
  async getTokenStatus(@Req() req, @Param('token') token: string) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('USER_NOT_VALIDATE');
    }

    return this.authService.getLoginStatusOne(user, token);
  }
  @ApiTags('Auth')
  @UseGuards(JwtAuthGuard)
  @Get('login-status/:token')
  @HttpCode(200)
  async getTokenStatusById(@Req() req, @Param('token') token: string) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('USER_NOT_VALIDATE');
    }

    return this.authService.getLoginStatusOne(user, token);
  }

  @ApiTags('Auth')
  @Get('renew-token/:token')
  async refeshToken(@Param('token') token: string) {
    return this.authService.renewAccessToken(token);
  }

  @ApiTags('Auth')
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const { user, client_data } = req;
    if (!user) {
      throw new UnauthorizedException('USER_NOT_VALIDATE');
    }
    return this.authService.login(user, client_data);
  }

  @ApiTags('Auth')
  @UseGuards(JwtAuthGuard)
  @Delete('force-logout/:token')
  async ForceLogout(@Param('token') token: string, @Req() req) {
    const { user } = req;
    if (!user) {
      throw new UnauthorizedException('USER_NOT_VALIDATE');
    }
    return await this.refeshTokenRepository.delete(token);
  }

  @ApiTags('Auth')
  @UseGuards(JwtAuthGuard)
  @Delete('logout/:token')
  async Logout(@Param('token') token: string, @Req() req) {
    const { user } = req;
    if (!user) {
      throw new UnauthorizedException('USER_NOT_VALIDATE');
    }
    return await this.authService.logout(token);
  }
}
