import { GLOBAL } from '@/utils/index';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeviceEntity } from './device.entity';
import { ParentWeb } from './common';

@Entity({ name: 'amenities', database: GLOBAL.G_DB_NAME })
export class AmenityEntity extends ParentWeb {
  @Column({
    type: 'nvarchar',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    length: 255,
  })
  Type: string;

  @OneToMany(() => DeviceEntity, (device) => device.Amenity, { nullable: true })
  Devices: DeviceEntity[];
}
