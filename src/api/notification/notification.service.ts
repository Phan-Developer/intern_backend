import { CreateNotifyDto, UpdateNotifyDto } from '@/dto/notification.dto';
import { NotificationTbService } from '@/service/notification-tb/notification-tb.service';
import { UserTbService } from '@/service/user-tb/user-tb.service';
import { Pagination } from '@/utils/types';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notifyTbService: NotificationTbService,
    private readonly userTbService: UserTbService,
  ) {}

  // Create
  async create(createNotify: CreateNotifyDto, userId: string) {
    // find user to notify
    const user = await this.userTbService.findById(userId);

    if (!user) throw new NotFoundException('Người dùng không tồn tại');

    return await this.notifyTbService.create({
      ...createNotify,
      UserId: user,
    });
  }

  // Update
  async update(updateNotify: UpdateNotifyDto, userId: string) {
    // find notify
    const notify = await this.notifyTbService.findById(updateNotify.ID);

    if (!notify) throw new NotFoundException('Không tìm thấy thông báo');

    // find user to notify
    const user = await this.userTbService.findById(userId);

    if (!user) throw new NotFoundException('Người dùng không tồn tại');

    return await this.notifyTbService.update({
      ...notify,
      ...updateNotify,
      UserId: user,
    });
  }

  // Delete with notify id
  async deleteByNotifyId(notifyId: string) {
    const notifyDeleted = await this.notifyTbService.deleteByNotifyId(notifyId);
    if (notifyDeleted.affected !== 1)
      throw new BadRequestException('Lỗi khi thực thi lệnh xóa');
    return { message: 'Xoá thành công' };
  }

  // Delete all notify with user id
  async deleteByUserId(userId: string) {
    const allNotifyOfUserDeleted = await this.notifyTbService.deleteByUserId(
      userId,
    );

    if (allNotifyOfUserDeleted.affected === 0)
      throw new BadRequestException('Lỗi khi thực thi lệnh xóa');
    return { message: 'Toàn bộ thông báo đã được xóa' };
  }

  // Find and pagination
  async findAndPagination(pagination: Pagination) {
    return await this.notifyTbService.find(pagination);
  }

  // Find by notify id
  async findByNotifyId(notifyId: string) {
    const notify = await this.notifyTbService.findById(notifyId);
    if (!notify) throw new BadRequestException('Không thể tìm thấy thông báo');
    return notify;
  }

  // Find notification by user id
  async findNotifyByUserId(userId: string, pagination: Pagination) {
    return await this.notifyTbService.findNotificationsByUserId(
      userId,
      pagination,
    );
  }
}
