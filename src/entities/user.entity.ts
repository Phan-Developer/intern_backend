import { GLOBAL } from '@/utils/variable';
import { Column, Entity } from 'typeorm';
import { ParentWeb } from './common';

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

  @Column({ nullable: true, type: 'nvarchar', length: 255 })
  Avatar: string;

  @Column({ type: 'bit', default: false })
  IsSupperAdmin: boolean;
}
