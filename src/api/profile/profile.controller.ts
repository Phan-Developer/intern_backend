import {
  Controller,
  Get,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { JWTPayload } from '@/dto/jwt.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @ApiTags('Auth')
  @Get()
  async getInfo(@Request() req) {
    if (!req.user) {
      return new UnauthorizedException();
    }
    const user: JWTPayload = req.user;
    if (user) {
      return await this.profileService.getInfo(user);
    }
  }
}
