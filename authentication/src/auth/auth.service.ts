import { ForbiddenException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { AuthenticatedUser, JwtTokens } from 'commonDataModel';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    private logger: Logger;
    constructor(private userService: UsersService, private jwtService: JwtService, private configService: ConfigService) {
        this.logger = new Logger('AuthService', { timestamp: true });
    }

    async login(email: string, password: string): Promise<JwtTokens> {

        const { id, email: userEmail, roles } = await this.validateUser(email, password);
        return this.generateTokens(id, userEmail, roles);
    }

    async logout(userId: string): Promise<void> {

        await this.userService.deActivateRefreshToken(userId);
        
        this.logger.log(`logged out user: ${userId} and removed active refresh token`);
    }

    async validateUser(email: string, password: string): Promise<AuthenticatedUser> {
        
        const user = await this.userService.findByEmailAndPassword(email, password);

        if(!user){
            throw new UnauthorizedException();
        }

        { 
            const { password, ...restOfProps} = user
            
            const roles = restOfProps.roles.map(r => r.role);
            return {...restOfProps, roles};
        }
    }

    async refreshTokens(userId: string, refreshToken: string): Promise<JwtTokens> {

        const user = await this.userService.findById(userId);

        if( !user || user.refreshTokens.length === 0 || ( refreshToken !== user.refreshTokens[0].token)){

            this.logger.debug(`user ${userId} does not exist or does not have a valid refresh token`);
            throw new ForbiddenException('Access denied');
        }

        const { email, roles } = user;

        return this.generateTokens(userId, email, roles.map(r => r.role));
    }

    generateTokens(userId: string, email: string, roles: Role[]): JwtTokens {
        
        const payload = { email, sub: userId, roles};

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
