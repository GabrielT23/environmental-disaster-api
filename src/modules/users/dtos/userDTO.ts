import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString({ message: 'Nome inválido' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email é obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'senha é obrigatória' })
  password: string;

  @IsEnum(Role)
  @IsNotEmpty({ message: 'Role é obrigatória' })
  role: Role;

  @IsString()
  @IsNotEmpty({ message: 'Cpf é obrigatório' })
  cpf: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
