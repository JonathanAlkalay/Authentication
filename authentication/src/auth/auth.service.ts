import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUser, JwtTokens } from 'commonDataModel';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService, private configService: ConfigService) { }

    async login(email: string, password: string): Promise<JwtTokens> {

        const { id, email: userEmail} = await this.validateUser(email, password);
        return this.generateTokens(id, userEmail);
    }

    async logout(userId: string): Promise<void> {
        return await this.userService.deActivateRefreshToken(userId);
    }

    async validateUser(email: string, password: string): Promise<AuthenticatedUser> {
        
        const user = await this.userService.findByEmailAndPassword(email, password);

        if(!user){
            throw new UnauthorizedException();
        }

        { 
            const { password, ...restOfProps} = user
            return restOfProps;
        }
    }

    async refreshTokens(userId: string, refreshToken: string): Promise<JwtTokens> {

        const user = await this.userService.findById(userId);

        if( !user || user.refreshTokens.length === 0 || ( refreshToken !== user.refreshTokens[0].token)){
            throw new ForbiddenException('Access denied');
        }

        return this.generateTokens(userId, user.email);
    }

    generateTokens(userId: string, email: string): JwtTokens {
        
        const payload = { email, sub: userId};

        const tokens: JwtTokens = {
            accessToken: this.jwtService.sign(payload, {
                secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
                expiresIn: this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_TIME')
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
                expiresIn: this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_TIME')
            }),
        }
        this.userService.updateRefreshToken(tokens.refreshToken, userId);
        return tokens;
    }
}