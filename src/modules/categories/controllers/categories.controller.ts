import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categoriesDTO';

@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createCategoryData: CreateCategoryDto) {
    await this.categoriesService.create(createCategoryData);
    return {
      statusCode: 201,
      message: 'Categoria criada com sucesso',
    };
  }

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.categoriesService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCategoryData: UpdateCategoryDto,
  ) {
    await this.categoriesService.update(id, updateCategoryData);
    return {
      statusCode: 200,
      message: 'Categoria atualizada com sucesso',
    };
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.categoriesService.delete(id);
    return {
      statusCode: 200,
      message: 'Categoria deletada com sucesso',
    };
  }
}
