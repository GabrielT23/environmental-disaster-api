import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/infra/database/prisma.service';

@Controller('/users')
export class CreateUsersController {
  constructor(
    private readonly prismaService: PrismaService
  
  ) {}

  @Post()
  create(){
    
  }
}