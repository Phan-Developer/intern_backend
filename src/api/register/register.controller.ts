import { UserTbService } from '@/service/user-tb/user-tb.service';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RegisterService } from './register.service';
import { UserRegister } from '@/dto/user.dto';

@Controller('register')
export class RegisterController {
  constructor(
    private userTbService: UserTbService,
    private registerService: RegisterService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiTags('Auth')
  @Post()
  async register(@Body() userRegister: UserRegister, @Request() req) {
    const jwtPayload = req.user;
    return this.registerService.registerAdmin(userRegister, jwtPayload);
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiTags('Auth')
  // @Post('/by-admin')
  // async registerByUserManager(
  //   @Body() userRegister: UserRegister,
  //   @Request() req,
  // ) {
  //   const jwtPayload: JWTPayload = req.user;
  //   if (
  //     !userRegister?.Email ||
  //     !userRegister?.Password ||
  //     !userRegister?.Name
  //   ) {
  //     throw new NotFoundException({ message: 'Không đủ thông tin' });
  //   }
  //   return this.userTbService.registerByUserManager(userRegister, jwtPayload);
  // }
}
