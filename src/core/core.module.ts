import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './data/prisma/prisma.service';
import { configuration } from './infra/config/configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CoreModule {}
