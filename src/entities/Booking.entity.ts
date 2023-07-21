import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GLOBAL } from '../utils';
import { RoomEntity } from './Room.entity';
import { UserEntity } from './user.entity';
import { ParentWeb } from './common';

@Entity({ name: 'bookings', database: GLOBAL.G_DB_NAME })
export class BookingEntity extends ParentWeb {
  @Column({ type: 'datetime', nullable: true })
  ArrivalDate: Date;

  @Column({ type: 'datetime', nullable: true })
  CheckIn: Date;

  @Column({ type: 'datetime', nullable: true })
  CheckOut: Date;

  @Column({ type: 'float', nullable: true })
  TotalMoney: number;

  @Column({
    type: 'boolean',
    default: false,
    nullable: true,
  })
  Status: boolean;

  @ManyToOne(() => RoomEntity, (room) => room.Bookings)
  @JoinColumn({ name: 'RoomId' })
  RoomId: RoomEntity;

  @ManyToOne(() => UserEntity, (user) => user.Bookings)
  @JoinColumn({ name: 'UserId' })
  UserId: UserEntity;
}
