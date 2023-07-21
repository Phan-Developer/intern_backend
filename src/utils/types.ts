import { Roles } from './variable';

export interface Pagination {
  page: number;
  size: number;
  count?: number;
}

export interface BaseEntityType {
  ID: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
}

export interface TypeRoom extends BaseEntityType {
  Type: string;
  Description: string;
}

export interface Amenity extends BaseEntityType {
  Type: string;
  Devices: Device[];
}

export interface Device extends BaseEntityType {
  Name: string;
  Amenity: Amenity;
}

export interface User extends BaseEntityType {
  Email: string;
  Password: string;
  Name: string;
  Phone: string;
  Address: string;
  Avatar: string;
  Role: Roles;
  Notifications?: Notification[];
}

export interface Notification extends BaseEntityType {
  Title: string;
  Content: string;
  Status: boolean;
  UserId: User;
}
