import { PrismaService } from '@modules/prisma/infra/database/prisma.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/userDTO';
import { UsersRepository } from '../repositories/implementations/prisma-users-repository';
import { IUsersRepository } from '../repositories/IUsers-repository';
import { hash } from 'bcryptjs';
import { User } from '@prisma/client';


@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.usersRepository.findByEmailORCpf(createUserDto.email, createUserDto.cpf)
    if(userExist)
      throw new ConflictException('usuário já existente');

    const passwordHash = await hash(createUserDto.password, 8);
    createUserDto.password = passwordHash;
    const user = await this.usersRepository.create(createUserDto);
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
    const userExist = await this.usersRepository.findById(id)

    if(!userExist)
      throw new NotFoundException('Usuário não existe');

    const user = await this.usersRepository.update(id, updateUserDto)
    return user;
  }

  async remove(id: string): Promise<void> {
    const userExist = await this.usersRepository.findById(id)
    if(!userExist)
      throw new NotFoundException('usuário já existente');
    await this.usersRepository.deleteById(id)
  }
}
