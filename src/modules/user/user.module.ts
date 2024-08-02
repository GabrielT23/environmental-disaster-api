import { Module } from "@nestjs/common";
import { CreateUsersController } from "./controllers/create-users.controller";
import { CreateUsersService } from "./services/create-users.service";
import { PrismaService } from "@modules/prisma/infra/database/prisma.service";
import { PrismaModule } from "@modules/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [CreateUsersController],
    providers: [CreateUsersService, CreateUsersController],
    exports: [CreateUsersController]
  })
  export class UsersModule {}