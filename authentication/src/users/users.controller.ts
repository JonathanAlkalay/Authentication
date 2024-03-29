import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AllowNoAuth, AllowNoRoles, DecryptedAccessToken, DecryptedRefreshToken, RequiresRoles } from 'src/utils/custom-decorators';
import { LoginInfoDTO, JwtTokens, AuthenticatedUser } from 'commonDataModel';
import { ExtractedRefreshToken } from 'src/auth/model/auth';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@RequiresRoles('USER')
export class UsersController {

    constructor (private authService: AuthService) {}

    @AllowNoRoles()
    @AllowNoAuth()
    @Post('login')
    async login(@Body(){ email, password }: LoginInfoDTO): Promise<JwtTokens> {
        return this.authService.login(email, password);
    } 

    @Post('logout')
    async logout(@DecryptedAccessToken() { id }: AuthenticatedUser): Promise<void> {
        return this.authService.logout(id);
    }

    @AllowNoAuth() 
    @AllowNoRoles()
    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    async refreshTokens(@DecryptedRefreshToken() { refreshToken, userId }: ExtractedRefreshToken): Promise<JwtTokens> {
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
