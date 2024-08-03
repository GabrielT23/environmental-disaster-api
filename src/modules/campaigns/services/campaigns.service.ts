import { Injectable } from '@nestjs/common';
import { ICampaignsRepository } from '../repositories/campaigns-repository.abstract';
import { CreateCampaignDto, UpdateCampaignDto } from '../dtos/campaignsDTO';
import { Campaign } from '@prisma/client';

@Injectable()
export class CampaignsService {
  constructor(private readonly campaignsRepository: ICampaignsRepository) {}

  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const campaign = await this.campaignsRepository.create(createCampaignDto);
    return campaign;
  }

  async findAll(): Promise<Campaign[]> {
    const campaigns = await this.campaignsRepository.findAll();
    return campaigns;
  }

  async findOne(id: string): Promise<Campaign> {
    const campaign = await this.campaignsRepository.findById(id);
    return campaign;
  }

  async update(
    id: string,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    const campaign = await this.campaignsRepository.update(
      id,
      updateCampaignDto,
    );
    return campaign;
  }

  async remove(id: string): Promise<void> {
    await this.campaignsRepository.delete(id);
  }
}
