import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '@core/data/prisma/prisma.service';
import { CategoryStatus } from '@prisma/client';

describe('CategoriesController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = moduleFixture.get(PrismaService);
    await prismaService.category.deleteMany();

    const createUserDto = {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin1234',
        role: 'admin',
        cpf: '00000000000',
        address: {
          street: 'Admin Street',
          city: 'Admin City',
          state: 'Admin State',
          country: 'Admin Country',
          zipCode: '00000-000',
        },
      };
  
      await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);
  
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: createUserDto.email, password: createUserDto.password })
        .expect(201);
  
      authToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await prismaService.category.deleteMany();
    await app.close();
  });

  it('/categories (POST)', async () => {
    const createCategoryDto = {
      name: 'Categoria de Teste',
      status: CategoryStatus.active,
    };

    const response = await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${authToken}`)
      .send(createCategoryDto)
      .expect(201);

    expect(response.body).toHaveProperty('statusCode', 201);
    expect(response.body).toHaveProperty('message', 'Categoria criada com sucesso');
  });

  it('/categories (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/categories')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it('/categories/:id (GET)', async () => {
    const category = await prismaService.category.create({
      data: {
        name: 'Categoria de Teste',
        status: CategoryStatus.active,
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/categories/${category.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', category.id);
  });

  it('/categories/:id (PATCH)', async () => {
    const category = await prismaService.category.create({
      data: {
        name: 'Categoria de Teste',
        status: CategoryStatus.active,
      },
    });

    const updateCategoryDto = {
      name: 'Categoria Atualizada',
      status: CategoryStatus.pending,
    };

    const response = await request(app.getHttpServer())
      .patch(`/categories/${category.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateCategoryDto)
      .expect(200);

    expect(response.body).toHaveProperty('statusCode', 200);
    expect(response.body).toHaveProperty('message', 'Categoria atualizada com sucesso');

    const updatedCategory = await prismaService.category.findUnique({
      where: { id: category.id },
    });

    expect(updatedCategory.name).toBe(updateCategoryDto.name);
    expect(updatedCategory.status).toBe(updateCategoryDto.status);
  });

  it('/categories/:id (DELETE)', async () => {
    const category = await prismaService.category.create({
      data: {
        name: 'Categoria de Teste',
        status: CategoryStatus.active,
      },
    });

    await request(app.getHttpServer())
      .delete(`/categories/${category.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    const deletedCategory = await prismaService.category.findUnique({
      where: { id: category.id },
    });

    expect(deletedCategory).toBeNull();
  });
});
