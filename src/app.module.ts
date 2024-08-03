import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/user.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { configuration } from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from '@modules/categories/categories.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CampaignsModule } from '@modules/campaigns/campaigns.module';
import { AddressesModule } from '@modules/addresses/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UsersModule,
    PrismaModule,
    CategoriesModule,
    AuthModule,
    CampaignsModule,
    AddressesModule
  ],
})
export class AppModule {}
