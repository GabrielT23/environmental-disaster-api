import { OccurrenceStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOccurenceDto {
  @IsNotEmpty({ message: 'Nome da ocorrência é o obrigatório' })
  @IsString({ message: 'Nome inválido' })
  title: string;

  @IsNotEmpty({ message: 'Descrição da ocorrência é o obrigatório' })
  @IsString({ message: 'Descrição inválida' })
  description: string;

  @IsNotEmpty({ message: 'Latitude é obrigatória' })
  @IsNumber()
  latitude: number;

  @IsNotEmpty({ message: 'Longitude é obrigatória' })
  @IsNumber()
  longitude: number;

  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  @IsUUID('4')
  userId: string;

  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  @IsUUID('4')
  categoryId: string;
}

export class UpdateOccurenceDto {
  @IsOptional()
  @IsString({ message: 'Nome inválido' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Descrição inválida' })
  description: string;

  @IsOptional()
  @IsEnum(OccurrenceStatus)
  status: OccurrenceStatus;

  @IsNotEmpty()
  @IsUUID('4')
  userId: string;
}
