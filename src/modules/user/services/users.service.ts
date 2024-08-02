import { PrismaService } from '@modules/prisma/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, User } from '../dtos/userDTO';
import { UsersRepository } from '../repositories/implementations/prisma-users-repository';
import { IUsersRepository } from '../repositories/IUsers-repository';


@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.create(createUserDto);
    console.log(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.findAll()
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id)
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {

    const user = await this.usersRepository.update(id, updateUserDto)
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.deleteById(id)
  }
}
