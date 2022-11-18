import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async findByEmailAndPassword(email: string, password: string): Promise<Users> {
        return await this.prismaService.users.findFirst({ where: { email, password } });
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
