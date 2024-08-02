import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/user.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { configuration } from './config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UsersModule, PrismaModule],
})
export class AppModule {}
