import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersController } from './users/users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { AccessTokenStrategy } from './auth/strategies/access-token.strategy';
import { RefreshTokenStrategy } from './auth/strategies/refresh-token.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    PassportModule,
    JwtModule.register({})
  ],
  controllers: [
    UsersController
  ],
  providers: [
    ConfigService, 
    PrismaService,
    AuthService,
    UsersService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    AccessTokenStrategy,
    RefreshTokenStrategy
  ],
})
export class AppModule {}
