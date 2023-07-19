import { JWTPayload } from '@/dto/jwt.dto';
import { UserTbService } from '@/service/user-tb/user-tb.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(private readonly userTbService: UserTbService) {}

  async getInfo(jwtPayload: JWTPayload) {
    const userFind = await this.userTbService.findById(jwtPayload.ID);
    if (!userFind) {
      throw new UnauthorizedException();
    }
    // const appRole = await this.roleAppService.findAllByRoleGroup(roleGroup, jwtPayload);
    delete userFind.Password;

    return userFind;
  }
}
