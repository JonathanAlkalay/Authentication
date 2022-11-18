import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { AuthenticatedUser } from "commonDataModel";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DecryptedAccessToken } from "../model/auth";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
    constructor( private configService: ConfigService ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET')
        })
    }

    async validate({ sub, email }: DecryptedAccessToken): Promise<AuthenticatedUser> {
        return { id: sub, email }
    }
}