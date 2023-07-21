import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { GLOBAL } from '../utils';
import { ParentWeb } from './common';
import { CommentEntity } from './Comment.entity';
import { BookingEntity } from './Booking.entity';
import { TypeRoomEntity } from './type.room.entity';

@Entity({ name: 'rooms', database: GLOBAL.G_DB_NAME })
export class RoomEntity extends ParentWeb {
  @Column({
    type: 'nvarchar',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    length: 255,
    nullable: true,
  })
  Title: string;

  @Column({
    type: 'text',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
  })
  Description: string;

  @Column({ type: 'simple-array' })
  Images: string[];

  @Column({
    type: 'text',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    nullable: true,
  })
  Address: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  Latitude: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  Longtitude: string;

  @Column({ type: 'int', nullable: true })
  Guests: number;

  @Column({ type: 'int', nullable: true })
  Bedroom: number;

  @Column({ type: 'int', nullable: true })
  Beds: number;

  @Column({ type: 'int', nullable: true })
  Price: number;

  @Column({ type: 'float', default: null })
  Rating: number;

  @Column({ type: 'boolean', default: false })
  IsBooking: boolean;

  @OneToMany(() => CommentEntity, (comment) => comment.RoomId)
  Comments: CommentEntity[];

  @OneToMany(() => BookingEntity, (booking) => booking.RoomId)
  Bookings: BookingEntity[];

  @ManyToOne(() => TypeRoomEntity, (typeRoom) => typeRoom.Rooms)
  @JoinColumn({
    name: 'TypeRoomId',
  })
  TypeRoomId: TypeRoomEntity;
}
