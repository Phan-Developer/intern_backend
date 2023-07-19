import { GLOBAL } from '@/utils/variable';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'refesh_token', database: GLOBAL.G_DB_NAME })
export class RefeshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  /**
   * Loại hệ điều hành
   */
  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Os: string;

  /**
   * Địa chỉ Ip
   */
  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Ip: string;

  /**
   * Loại thiết bị
   */
  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Device: string;

  /**
   * Loại trình duyệt
   */
  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Browser: string;

  /**
   * Hạn token
   */
  @Column({ type: 'nvarchar', length: 255 })
  Expired: string;

  @ManyToOne(() => UserEntity, (user) => user.ID)
  UserCreate: UserEntity;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @DeleteDateColumn()
  DeleteAt: Date;
}
