import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { OccurencesService } from '../services/occurences.service';
import { CreateOccurenceDto, UpdateOccurenceDto } from '../dtos/occurrenceDTO';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('occurences')
export class OccurencesController {
  constructor(private readonly occurencesService: OccurencesService) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createOccurenceDto: CreateOccurenceDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    await this.occurencesService.create({ ...createOccurenceDto, files });

    return {
      statusCode: 201,
      message: 'Ocorrência criada com sucesso',
    };
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateOccurenceDto: UpdateOccurenceDto,
  ) {
    await this.occurencesService.update(id, updateOccurenceDto);

    return {
      statusCode: 200,
      message: 'Ocorrência atualizada com sucesso',
    };
  }

  @Get()
  async findAll() {
    return await this.occurencesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.occurencesService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.occurencesService.remove(id);

    return {
      statusCode: 200,
      message: 'Ocorrência deletada com sucesso',
    };
  }
}
