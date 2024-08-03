import { Injectable, NotFoundException } from '@nestjs/common';
import { IOccurrencesRepository } from '../repositories/occurences-repository.abstract';
import { CreateOccurenceDto, UpdateOccurenceDto } from '../dtos/occurrenceDTO';

@Injectable()
export class OccurencesService {
  constructor(private readonly occurrencesRepository: IOccurrencesRepository) {}

  async create(data: CreateOccurenceDto) {
    const newOccurence = await this.occurrencesRepository.create(data);

    return newOccurence;
  }

  async findAll() {
    return await this.occurrencesRepository.findAll();
  }

  async findOne(id: string) {
    return await this.occurrencesRepository.findById(id);
  }

  async update(id: string, data: UpdateOccurenceDto) {
    const hasOccurrence = await this.occurrencesRepository.findById(id);

    if (!hasOccurrence) {
      throw new NotFoundException('Ocorrência não encontrada');
    }

    const updatedOccurrence = await this.occurrencesRepository.update(id, data);
    return updatedOccurrence;
  }

  async remove(id: string) {
    const hasOccurrence = await this.occurrencesRepository.findById(id);
    if (!hasOccurrence) {
      throw new NotFoundException('Ocorrência não encontrada');
    }

    return await this.occurrencesRepository.delete(id);
  }
}
