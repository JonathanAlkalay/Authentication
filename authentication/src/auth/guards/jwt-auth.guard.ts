import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    
    constructor(private reflector: Reflector) { super(); }

    canActivate(context: ExecutionContext) {
        const skipAuth = this.reflector.getAllAndOverride<boolean>('skipAuth', [
            context.getHandler(),
            context.getClass()
        ]);

        return skipAuth ? true: super.canActivate(context);
    }
}