import { CreateNotifyParams, UpdateNotifyParams } from '@/dto/notification.dto';
import { NotificationEntity } from '@/entities/notification.entity';
import { Notification, Pagination } from '@/utils/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationTbService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notifyRepository: Repository<NotificationEntity>,
  ) {}

  // Create
  async create(createNotify: CreateNotifyParams) {
    const newDevice = this.notifyRepository.create(createNotify);
    return await this.notifyRepository.save(newDevice);
  }

  // Update
  async update(updateDevice: UpdateNotifyParams) {
    return await this.notifyRepository.save(updateDevice);
  }

  // Delete with notify id
  async deleteByNotifyId(id: string) {
    return await this.notifyRepository.softDelete(id);
  }

  // Delete all notify with user id
  // Implement softDelete a list data
  async deleteByUserId(id: string) {
    return await this.notifyRepository
      .createQueryBuilder()
      .update(NotificationEntity)
      .set({ DeletedAt: new Date() })
      .where('UserId.ID = :id', { id })
      .execute();
  }

  // Find and pagination
  async find(pagination: Pagination = { page: 1, size: 10 }) {
    const [result, total] = await this.notifyRepository.findAndCount({
      relations: ['UserId'],
      take: pagination.size,
      skip: (pagination.page - 1) * pagination.size,
    });
    return {
      data: result,
      pagination: {
        page: pagination.page,
        size: pagination.size > total ? total : pagination.size,
        count: total,
      } as Pagination,
    };
  }

  // Find one
  async findOne(options: Partial<Notification>) {
    return await this.notifyRepository.findOne({
      relations: ['UserId'],
      where: { ...options },
    });
  }

  // Find all notifications of a user
  async findNotificationsByUserId(userId: string, pagination: Pagination) {
    const [result, total] = await this.notifyRepository.findAndCount({
      where: {
        UserId: {
          ID: userId,
        },
      },
      relations: ['UserId'],
      take: pagination.size,
      skip: (pagination.page - 1) * pagination.size,
    });

    return {
      data: result,
      pagination: {
        page: pagination.page,
        size: pagination.size > total ? total : pagination.size,
        count: total,
      } as Pagination,
    };
  }
}
