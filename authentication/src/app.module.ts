import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service';
import { UsersController } from './users/users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { AccessTokenStrategy } from './auth/strategies/access-token.strategy';
import { RefreshTokenStrategy } from './auth/strategies/refresh-token.strategy';
import { AdminsController } from './admins/admins.controller';
import { AdminsService } from './admins/admins.service';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    PassportModule,
    JwtModule.register({})
  ],
  controllers: [
    UsersController,
    AdminsController
  ],
  providers: [
    ConfigService, 
    PrismaService,
    AuthService,
    UsersService,
    AdminsService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    AccessTokenStrategy,
    RefreshTokenStrategy
  ],
})
export class AppModule {}
