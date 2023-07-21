import { GLOBAL } from '@/utils/index';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AmenityEntity } from './amenity.entity';
import { ParentWeb } from './common';

@Entity({ name: 'devices', database: GLOBAL.G_DB_NAME })
export class DeviceEntity extends ParentWeb {
  @Column({
    type: 'nvarchar',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    length: 255,
  })
  Name: string;

  @ManyToOne(() => AmenityEntity, (amenity) => amenity.ID)
  @JoinColumn({
    name: 'amenity',
  })
  Amenity: AmenityEntity;
}
