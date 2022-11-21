import { Injectable, Logger } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { comparePasswordToHash } from '../utils/password-hash';
@Injectable()
export class UsersService {
    private readonly logger: Logger;
    constructor(private prismaService: PrismaService) {
        this.logger = new Logger('UsersService', {timestamp: true});
    }

    async findByEmailAndPassword(email: string, password: string): Promise<Users> {

        const user = await this.prismaService.users.findFirst({ where: { email } });

        const isPasswordValid = await comparePasswordToHash(password, user?.password);

        if(!user || !isPasswordValid){

            this.logger.debug(`user does not exit or credentials are wrong for email: ${email} password:${password}`)

            return null;
        }
        
        return user;
    }

    async findById(id: string): Promise< Users & { refreshTokens: { token: string }[] }> {
        return this.prismaService.users.findUnique({
            where: { id },
            include: {
                refreshTokens: {
                    where: { isActive: true},
                    select: { token: true }
                }
            }
        });
    }
    
    async updateRefreshToken(token: string, userId: string): Promise<void> {
        
        await this.deActivateRefreshToken(userId);
        
        await this.prismaService.users.update({
            where: { id: userId },
            data: { refreshTokens: { createMany: { data: { token } } } }
        })

        this.logger.log(`updated user ${userId} refresh token: ${token}`)
    }

    async deActivateRefreshToken(userId: string): Promise<void> {
        await this.prismaService.users.update({
            where: { id: userId },
            data: {
                refreshTokens: {
                    updateMany: {
                        where: { isActive: true },
                        data: { isActive: false }
                    }
                }
            }
        })
    }
}
