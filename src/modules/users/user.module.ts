import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { PrismaService } from "@modules/prisma/infra/database/prisma.service";
import { PrismaModule } from "@modules/prisma/prisma.module";
import { usersRepositoryProvider } from "./repositories/users-repository.provider";

@Module({
    imports: [PrismaModule],
    controllers: [UsersController],
    providers: [UsersService, usersRepositoryProvider ],
  })
  export class UsersModule {}