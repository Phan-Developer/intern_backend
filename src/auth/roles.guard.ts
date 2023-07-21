import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Roles } from '../utils';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // call AuthGuard in order to ensure user is injected in request
    const baseGuardResult = await super.canActivate(context);
    if (!baseGuardResult) {
      // unsuccessful authentication return false
      return false;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // TODO: ignore roles middleware if route not use @RoleGuard() decorator
    if (!requiredRoles) {
      return true;
    }

    // successfull authentication, user is injected
    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user?.Role?.includes(role));
  }
}
