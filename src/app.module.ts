import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/user/user.module';
import { PrismaModule } from '@modules/prisma/prisma.module';

@Module({
  imports: [UsersModule, PrismaModule],
})
export class AppModule {}
