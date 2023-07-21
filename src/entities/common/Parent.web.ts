import {
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user.entity';

export class ParentWeb {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @DeleteDateColumn()
  DeletedAt: Date;

  // @ManyToOne(() => UserEntity, (user) => user.ID, { nullable: true })
  // UserCreate: UserEntity;
}
