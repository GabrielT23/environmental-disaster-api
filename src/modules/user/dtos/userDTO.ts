import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsEnum, IsUUID, isNotEmpty, IsNotEmpty } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString({ message: 'Nome inválido' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  cpf: string;
}

  
  export interface User {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  }


export class UpdateUserDto extends PartialType(CreateUserDto) {}
  