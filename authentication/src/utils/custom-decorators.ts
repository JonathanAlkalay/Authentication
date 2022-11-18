import { createParamDecorator, ExecutionContext, SetMetadata } from "@nestjs/common";
import { ExtractedRefreshToken } from "src/auth/model/auth";

export const DecryptedAccessToken = createParamDecorator((_: unknown, ctx: ExecutionContext): ExtractedRefreshToken =>{
    return ctx.switchToHttp().getRequest().user
})

export const DecryptedRefreshToken = createParamDecorator((_: unknown, ctx: ExecutionContext): ExtractedRefreshToken =>{
    return ctx.switchToHttp().getRequest().user
})

export const AllowNoAuth = () => SetMetadata('skipAuth', true);