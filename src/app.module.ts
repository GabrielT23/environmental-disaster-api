import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/user.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { configuration } from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from '@modules/categories/categories.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UsersModule,
    PrismaModule,
    CategoriesModule,
    AuthModule
  ],
})
export class AppModule {}
