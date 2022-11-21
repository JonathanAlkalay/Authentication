import { ImATeapotException, Injectable, Logger } from '@nestjs/common';
import { Prisma, Role, Roles, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from '../utils/password-hash';

@Injectable()
export class AdminsService {
    private readonly logger: Logger

    constructor(private prismaService: PrismaService) { 

        this.logger = new Logger('AdminsService', { timestamp: true }) 
    }

    async createUser(email: string, password: string): Promise<Users> {

        const hashedPassword = await hashPassword(password);

        try{
            const user = await this.prismaService.users.create({ data: { email, password: hashedPassword } });

            this.logger.log(`created new user ${user.id}`);

            return user;
        }catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
              if (e.code === 'P2002') {
                this.logger.debug(`There is a unique constraint violation, a new user cannot be created with email: ${email}`)
              }
            }
            throw new ImATeapotException('email already exists')
        }
    }

    async deleteUser(id: string): Promise<void> {
        
        await this.prismaService.users.delete({ where: { id } });

        this.logger.log(`user ${id} was deleted`)
    }

    async alterUserRoles(userId: string, roles: Role[]): Promise<{roles: Roles[]; id: string; email: string;}>{
        const updatedUser =  await this.prismaService.users.update({
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

        this.logger.log(`user's ${userId} roles were changed to ${roles.map(r => `--${r}--`)}`);

        return updatedUser;
    }
}
