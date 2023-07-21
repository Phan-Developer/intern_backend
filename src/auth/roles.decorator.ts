import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY, Roles as roles } from '@/utils/variable';

export const Roles = (...roles: roles[]) => SetMetadata(ROLES_KEY, roles);
