import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'commonDataModel';

@Injectable()
export class RolesGuard implements CanActivate {
  
  private readonly logger: Logger;  
  constructor(private reflector: Reflector) {
    this.logger = new Logger('RolesGuard', { timestamp: true })
  }

  canActivate(context: ExecutionContext): boolean {

    const skipRoles = this.reflector.getAllAndOverride<boolean>('skipRoles', [
        context.getHandler(),
        context.getClass(),
    ]);

    if(skipRoles) {
        return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user } = context.switchToHttp().getRequest();
    const hasRequiredRole =  requiredRoles.some(role => user.roles.includes(role));

    if(!hasRequiredRole) { 
        this.logger.debug(
            `user ${user.id} does not have the required roles,
             roles required are ${requiredRoles.map(r => `-${r}-`)}`
        )
    }
    return hasRequiredRole
  }
}