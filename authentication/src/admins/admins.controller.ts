import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Roles, Users } from '@prisma/client';
import { AlterRolesDto, CreateUserDTO } from 'commonDataModel';
import { RequiresRoles } from 'src/utils/custom-decorators';
import { AdminsService } from './admins.service';

@Controller('admins')
@RequiresRoles('ADMIN')
export class AdminsController {

    constructor(private adminService: AdminsService) { }

    @Post('create')
    async createUser(@Body(){ email, password }: CreateUserDTO): Promise<Users> {
        return await this.adminService.createUser(email, password);
    }

    @Delete('delete/:userId')
    async deleteUser(@Param('userId')userId: string): Promise<void> {
        await this.adminService.deleteUser(userId);
    }

    @Post('alter/:userId')
    async alterUserRoles(@Param('userId')userId: string, @Body(){ roles }: AlterRolesDto): Promise<{roles: Roles[]; id: string; email: string;}> {        
        return this.adminService.alterUserRoles(userId, roles);
    }
}
