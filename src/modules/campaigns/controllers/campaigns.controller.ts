import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CampaignsService } from '../services/campaigns.service';
import { CreateCampaignDto, UpdateCampaignDto } from '../dtos/campaignsDTO';

@Controller('/campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  async create(@Body() createCampaignDto: CreateCampaignDto) {
    await this.campaignsService.create(createCampaignDto);
    return { statusCode: 201, message: 'Campanha criada com sucesso' };
  }

  @Get()
  async findAll() {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    await this.campaignsService.update(id, updateCampaignDto);
    return { statusCode: 200, message: 'Campanha atualizada com sucesso' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.campaignsService.remove(id);
    return { statusCode: 200, message: 'Campanha deletada com sucesso' };
  }
}
