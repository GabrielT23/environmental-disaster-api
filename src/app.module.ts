import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/user/user.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { CategoriesModule } from '@modules/categories/categories.module';

@Module({
  imports: [UsersModule, PrismaModule, CategoriesModule],
})
export class AppModule {}
