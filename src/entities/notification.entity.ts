import { GLOBAL } from '@/utils/index';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ParentWeb } from './common';
import { UserEntity } from './user.entity';

@Entity({ name: 'notifications', database: GLOBAL.G_DB_NAME })
export class NotificationEntity extends ParentWeb {
  @Column({
    type: 'nvarchar',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    length: 255,
  })
  Title: string;

  @Column({
    type: 'text',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    nullable: true,
  })
  Content: string;

  @Column({ type: 'boolean', default: false })
  Status: boolean;

  @ManyToOne(() => UserEntity, (user) => user.Notifications)
  @JoinColumn({
    name: 'UserId',
  })
  UserId: UserEntity;
}
