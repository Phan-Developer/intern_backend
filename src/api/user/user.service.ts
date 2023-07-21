import { JWTPayload } from '@/dto/jwt.dto';
import { UserTbService } from '@/service/user-tb/user-tb.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadFileService } from '../upload-file/upload-file.service';
import { UserRegister, UserUpdate } from '@/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userTbService: UserTbService,
    private readonly uploadFileService: UploadFileService,
  ) {}

  async createUser(userRegister: UserRegister) {
    return await this.userTbService.create(userRegister);
  }

  async updateUserByWeb(data: UserUpdate, jwtPayload: JWTPayload, files: any) {
    const userFind = await this.userTbService.findById(data.ID);
    if (!userFind) {
      throw new NotFoundException({ message: 'Lỗi đăng nhập' });
    }
    //remove old avatar
    let img = null;
    if (files && files.length > 0) {
      const fileUpload = await this.uploadFileService.uploadFiles(files);
      fileUpload.map((res: any) => {
        img = 'Users/' + res.path;
      });
    }
    const oldAvatarPath = userFind.Avatar;
    if (oldAvatarPath && img) {
      this.uploadFileService.deleteFileFromFilePath(oldAvatarPath);
    }
    const result = await this.userTbService.updateUserByWeb(
      { ...data, Avatar: img },
      jwtPayload,
    );
    return result;
  }
}
