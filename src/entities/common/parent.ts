import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Parent {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @Column({ type: 'bit', default: false })
  IsDelete: boolean;

  @Column({ type: 'bit', default: false })
  IsInsert: boolean;

  @Column({ type: 'bit', default: false })
  IsUpdate: boolean;

  // @ManyToOne(() => UserEntity, (user) => user.ID, { nullable: true })
  // UserCreate: UserEntity;
}
