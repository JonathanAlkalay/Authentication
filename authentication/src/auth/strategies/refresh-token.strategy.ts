import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DecryptedAccessToken } from "../model/auth";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor( private configService: ConfigService ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
            passReqToCallback: true
        })
    }

    async validate(req: Request, { sub: userId }: DecryptedAccessToken) {
        const refreshToken = req.get('authorization').replace('Bearer', '').trim();
        return { userId, refreshToken }
    }
}