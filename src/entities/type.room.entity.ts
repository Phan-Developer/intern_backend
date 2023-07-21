import { GLOBAL } from '@/utils/index';
import { Column, Entity, OneToMany } from 'typeorm';
import { ParentWeb } from './common';
import { RoomEntity } from './Room.entity';

@Entity({ name: 'type_rooms', database: GLOBAL.G_DB_NAME })
export class TypeRoomEntity extends ParentWeb {
  @Column({
    type: 'nvarchar',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    length: 255,
  })
  Type: string;

  @Column({
    type: 'text',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    nullable: true,
  })
  Description: string;

  @OneToMany(() => RoomEntity, (room) => room.TypeRoomId, { nullable: true })
  Rooms: RoomEntity[];
}
