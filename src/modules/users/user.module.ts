import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { usersRepositoryProvider } from './repositories/users-repository.provider';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthService } from '@modules/auth/services/auth.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, usersRepositoryProvider],
})
export class UsersModule {}
