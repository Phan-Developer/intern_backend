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

export interface CreateRoomParams {
  Title: string;
  Description: string;
  Images?: string[]; // edit
  Address: string;
  Latitude: string;
  Longtitude: string;
  Guests: number;
  Bedroom: number;
  Beds: number;
  Price: number;
  TypeRoomId: TypeRoom;
}

export interface UpdateRoomParams {
  ID?: string;
  Title?: string;
  Description?: string;
  Images?: string[];
  Address?: string;
  Latitude?: string;
  Longtitude?: string;
  Guests?: number;
  Bedroom?: number;
  Beds?: number;
  Price?: number;
  IsBooking?: boolean;
  TypeRoomId: TypeRoom;
}

export interface CreateCommentParams {
  RoomId: string;
  UserId: string;
  RatingValue: number;
  Content: string;
}

export interface UpdateCommentParams {
  ID: string;
  RatingValue?: number;
  Content?: string;
}

export interface CreateBookingParams {
  RoomId: string;
  ArrivalDate: Date;
}

export interface UpdateBookingParams {
  RoomId?: string;
  UserId?: string;
  ArrivalDate?: Date;
  CheckIn?: Date;
  CheckOut?: Date;
  TotalMoney?: number;
  Status?: boolean;
}
