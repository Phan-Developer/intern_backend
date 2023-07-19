import { JWTPayload } from '@/dto/jwt.dto';
import { UserRegister } from '@/dto/user.dto';
import { UserTbService } from '@/service/user-tb/user-tb.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RegisterService {
  constructor(private readonly userTbService: UserTbService) {}

  async registerAdmin(data: UserRegister, jwtPayLoad: JWTPayload) {
    const userInfo = await this.userTbService.findById(jwtPayLoad.ID);
    if (!userInfo) {
      throw new NotFoundException({ message: 'Lỗi đăng nhập' });
    }
    const result = await this.userTbService.create(data);
    return result;
  }
}
