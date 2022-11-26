import { createParamDecorator, ExecutionContext, SetMetadata } from "@nestjs/common";
import { Role } from "commonDataModel";
import { ExtractedRefreshToken } from "src/auth/model/auth";

export const DecryptedAccessToken = createParamDecorator((_: unknown, ctx: ExecutionContext): ExtractedRefreshToken =>{
    return ctx.switchToHttp().getRequest().user
})

export const DecryptedRefreshToken = createParamDecorator((_: unknown, ctx: ExecutionContext): ExtractedRefreshToken =>{
    return ctx.switchToHttp().getRequest().user
})

export const AllowNoAuth = () => SetMetadata('skipAuth', true);

export const AllowNoRoles = () => SetMetadata('skipRoles', true);

export const RequiresRoles = (...roles: Role[]) => SetMetadata('roles', roles);