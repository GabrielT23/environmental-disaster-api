import { Injectable } from '@nestjs/common';
import { IOccurrencesRepository } from '../occurences-repository.abstract';
import {
  CreateOccurenceDto,
  UpdateOccurenceDto,
} from '@modules/occurences/dtos/occurrenceDTO';
import { Occurrence } from '@prisma/client';
import { PrismaService } from '@modules/prisma/infra/database/prisma.service';

@Injectable()
export class OccurrencesRepository implements IOccurrencesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOccurenceDto): Promise<Occurrence> {
    const newOccurrence = await this.prisma.occurrence.create({
      data: {
        ...data,
        files: [],
      },
    });

    return newOccurrence;
  }

  async update(id: string, data: UpdateOccurenceDto): Promise<Occurrence> {
    const updatedOccurrence = await this.prisma.occurrence.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return updatedOccurrence;
  }

  async findAll(): Promise<Occurrence[]> {
    return await this.prisma.occurrence.findMany();
  }

  async findById(id: string): Promise<Occurrence | null> {
    return await this.prisma.occurrence.findUnique({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.occurrence.delete({
      where: { id },
    });

    return;
  }
}
