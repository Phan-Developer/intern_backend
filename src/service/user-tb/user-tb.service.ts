import { JWTPayload } from '@/dto/jwt.dto';
import { UserRegister, UserUpdate } from '@/dto/user.dto';
import { UserEntity } from '@/entities/user.entity';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserTbService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(Email: string) {
    return this.userRepository.findOne({
      where: { Email: Email },
    });
  }

  async findById(id: string) {
    return this.userRepository.findOne({
      where: { ID: id },
    });
  }

  async findByPhone(phone: string) {
    return this.userRepository.findOne({
      where: { Phone: phone },
    });
  }

  async create(userRegister: UserRegister) {
    const existPhone = await this.findByPhone(userRegister.Phone);
    if (existPhone) {
      throw new NotAcceptableException({
        message: 'Số điện thoại đã có người sử dụng',
      });
    }

    if (userRegister.Email) {
      const existEmail = await this.findByEmail(userRegister.Email);
      if (existEmail) {
        throw new NotAcceptableException({
          message: 'Email đã có người sử dụng',
        });
      }
    }

    const hashPw = await bcrypt.hash(userRegister.Password, 10);
    // const userRoleGroup = await this.roleGroupService.findByKey('user');

    const user = this.userRepository.create({
      Email: userRegister.Email,
      Password: hashPw,
      Name: userRegister.Name,
      Phone: userRegister.Phone,
      Avatar: null,
    });
    const newUser = await this.userRepository.save(user);

    delete newUser.Password;
    return newUser;
  }

  async updateUserByWeb(userUpdate: UserUpdate, jwtPayload: JWTPayload) {
    const userProcess = await this.findByEmail(jwtPayload.Email);
    if (!userProcess) {
      throw new NotFoundException({ message: 'Không tìm thấy user process' });
    }

    const userFind = await this.userRepository.findOne({
      where: { ID: userUpdate.ID },
    });
    if (!userFind) {
      throw new NotFoundException({ message: 'Không tìm thấy user' });
    }
    //update
    if (userUpdate.Email) {
      const checkUser = await this.findByEmail(userUpdate.Email);
      if (checkUser) {
        throw new NotAcceptableException({ messgae: 'Email đã được sử dụng!' });
      }
      userFind.Email = userUpdate.Email;
    }
    if (userUpdate.Name) {
      userFind.Name = userUpdate.Name;
    }
    if (userUpdate.Phone) {
      const checkUser = await this.findByPhone(userUpdate.Phone);
      if (checkUser) {
        throw new NotAcceptableException({
          messgae: 'Số điện thoại đã được sử dụng!',
        });
      }
      userFind.Phone = userUpdate.Phone;
    }
    if (userUpdate.Avatar) {
      userFind.Avatar = userUpdate.Avatar;
    }
    userFind.UpdatedAt = new Date();

    const newUserUpdate = await this.userRepository.save(userFind);
    delete newUserUpdate.Password;
    return newUserUpdate;
  }
}
