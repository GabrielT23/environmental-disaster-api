import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './data/prisma/prisma.service';
import { configuration } from './infra/config/configuration';
import { MulterModule } from '@nestjs/platform-express';
import { StorageProvider } from './data/storage';
import { FileService } from './infra/services/file.service';
import { MailService } from './infra/services/mail.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MulterModule.register({
      dest: '../../tmp',
    }),
  ],
  providers: [PrismaService, StorageProvider, FileService, MailService],
  exports: [PrismaService, StorageProvider, FileService, MailService],
})
export class CoreModule {}
