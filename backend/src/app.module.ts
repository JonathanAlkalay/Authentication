import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST ?? 'localhost',
      port: 3306,
      username: 'user',
      password: 'secret',
      database: 'deathStar',
      autoLoadModels: true,
      logging: false,
      dialectOptions: { decimalNumbers: true },
      synchronize: false,
      models: [],
    }),
    SequelizeModule.forFeature([

    ])
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
