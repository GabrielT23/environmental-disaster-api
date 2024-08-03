import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { usersRepositoryProvider } from './repositories/users-repository.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, usersRepositoryProvider],
})
export class UsersModule {}
