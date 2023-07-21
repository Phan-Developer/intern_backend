import { GLOBAL } from '@/utils/index';
import { Column, Entity } from 'typeorm';
import { Parent } from './common/parent';

@Entity({ name: 'companies', database: GLOBAL.G_DB_NAME })
export class CompanyEntity extends Parent {
  @Column({ type: 'nvarchar', length: 255 })
  Name: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Logo: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Background: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Website: string;
}
