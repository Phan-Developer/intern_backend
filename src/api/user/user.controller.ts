import {
  Body,
  Controller,
  Put,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserRegister } from '@/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userRegister: UserRegister) {
    return await this.userService.createUser(userRegister);
  }
}
