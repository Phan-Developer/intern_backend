import { GLOBAL } from '../utils';
import { Parent } from './common/parent';
import { CompanyEntity } from './company.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'customers', database: GLOBAL.G_DB_NAME })
export class CustomerEntity extends Parent {
  @Column({ type: 'nvarchar', length: 255 })
  FullName: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Email: string;

  @Column({ type: 'nvarchar', length: 20 })
  PhoneNumber: string;

  @ManyToOne(() => CompanyEntity, (company) => company.ID, { nullable: true })
  @JoinColumn({ name: 'CompanyId' })
  CompanyId: CompanyEntity;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  Province: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  District: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  Wards: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  Address: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  Status: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Avatar: string;
}
