import { ImATeapotException, Injectable } from '@nestjs/common';
import { Prisma, Role, Roles, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from '../utils/password-hash';

@Injectable()
export class AdminsService {
    constructor(private prismaService: PrismaService) { }

    async createUser(email: string, password: string): Promise<Users> {
        
        const hashedPassword = await hashPassword(password);
        try{
            return await this.prismaService.users.create({ data: { email, password: hashedPassword } })
        }catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
              if (e.code === 'P2002') {
                console.debug('There is a unique constraint violation, a new user cannot be created with this email')
              }
            }
            throw new ImATeapotException('email already exists')
        }
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
