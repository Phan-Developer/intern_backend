import { GLOBAL } from '@/utils/variable';
import { Column, Entity, OneToMany } from 'typeorm';
import { ParentWeb } from './common';
import { BookingEntity } from './Booking.entity';
import { CommentEntity } from './Comment.entity';

enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity({ name: 'users', database: GLOBAL.G_DB_NAME })
export class UserEntity extends ParentWeb {
  @Column({ type: 'varchar', length: 100, nullable: true })
  Email: string;

  @Column({ type: 'varchar', length: 100 })
  Password: string;

  @Column({ type: 'nvarchar', length: 150 })
  Name: string;

  @Column({ unique: true, type: 'varchar', length: 13 })
  Phone: string;

  @Column({ type: 'nvarchar', length: 255 })
  Address: string;

  @Column({ nullable: true, type: 'nvarchar', length: 255 })
  Avatar: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  Role: Roles;

  @OneToMany(() => BookingEntity, (booking) => booking.UserId)
  Bookings: BookingEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.UserId)
  Comments: CommentEntity[];
}
