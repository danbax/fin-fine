import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';
import { TransactionsModule } from './components/transactions/transactions.module';
import { CategoriesModule } from './components/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTModule } from './libraries/auth/jwt/jwt.module';
import UserEntity from './components/users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 3306),
        username: configService.get<string>('DATABASE_USERNAME', 'root'),
        password: configService.get<string>('DATABASE_PASSWORD', 'root'),
        database: configService.get<string>('DATABASE_NAME', 'fin_fine'),
        entities: [UserEntity],
        synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE', true), // Useful for development, be cautious in production
      }),
    }),
    UsersModule,
    AuthModule,
    TransactionsModule,
    CategoriesModule,
    JWTModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
