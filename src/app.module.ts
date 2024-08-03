import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/user/user.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { CampaignsModule } from '@modules/campaigns/campaigns.module';

@Module({
  imports: [UsersModule, PrismaModule, CategoriesModule, CampaignsModule],
})
export class AppModule {}
