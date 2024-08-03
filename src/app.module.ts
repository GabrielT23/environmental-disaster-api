import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/user.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { configuration } from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from '@modules/categories/categories.module';
import { CampaignsModule } from '@modules/campaigns/campaigns.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UsersModule,
    PrismaModule,
    CategoriesModule,
    CampaignsModule,
  ],
})
export class AppModule {}
