import { Injectable } from '@nestjs/common';
import { Role, Roles, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminsService {
    constructor(private prismaService: PrismaService) { }

    async createUser(email: string, password: string): Promise<Users> {
        return await this.prismaService.users.create({ data: { email, password } })
    }

    async deleteUser(id: string): Promise<void> {
        await this.prismaService.users.delete({ where: { id } });
    }

    async alterUserRoles(userId: string, roles: Role[]): Promise<{roles: Roles[]; id: string; email: string;}>{
        return await this.prismaService.users.update({
            where: { id: userId },
            data: {
                roles: {
                    deleteMany: { userId },
                    createMany: {
                        data: roles.map(r => ({ role: r }))
                    }
                }
            },
            select: { roles: true, email: true, id: true }
        })
    }
}
