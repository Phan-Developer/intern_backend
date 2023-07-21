import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { GLOBAL } from '../utils';
import { ParentWeb } from './common';
import { RoomEntity } from './Room.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'comments', database: GLOBAL.G_DB_NAME })
export class CommentEntity extends ParentWeb {
  @Column({ type: 'int' })
  RatingValue: number;

  @Column({ type: 'text', charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
  Content: string;

  @ManyToOne(() => RoomEntity, (room) => room.ID)
  @JoinColumn({ name: 'RoomId' })
  RoomId: RoomEntity;

  @ManyToOne(() => UserEntity, (user) => user.Comments)
  @JoinColumn({ name: 'UserId' })
  UserId: UserEntity;
}
