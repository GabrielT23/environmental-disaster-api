import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
import { CreateAddressDto, UpdateAddressesDto } from '../dtos/adressesDTO';
import { AddressService } from '../services/addresses.service';
  
  
  
  @Controller('/addresses')
  export class AddressesController {
    constructor(private readonly addressesService: AddressService) {}
  
    @Post()
    async create(@Body() createUserDto: CreateAddressDto) {
      const user = await this.addressesService.create(createUserDto);
      return user;
    }
  
    @Get(':id')
    async find(@Param('id') id: string) {
      return await this.addressesService.find(id);
    }
  
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateAddressesDto) {

      return await this.addressesService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return await this.addressesService.remove(id);
    }
  }