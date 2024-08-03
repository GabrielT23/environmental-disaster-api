import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '@modules/prisma/infra/database/prisma.service';
import { AppModule } from '../src/app.module';


describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = moduleFixture.get(PrismaService);
    await prismaService.user.deleteMany();
  });

  afterAll(async () => {
    await prismaService.user.deleteMany();
    await app.close();
  });

  it('/users (POST)', async () => {
    const createUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'client',
      cpf: '12345678900',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(createUserDto.email);
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it('/users/:id (GET)', async () => {
    const user = await prismaService.user.create({
      data: {
        name: 'Test User',
        email: 'test1@example.com',
        password: 'password1234',
        role: 'client',
        cpf: '12345678901',
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', user.id);
  });

  it('/users/:id (PATCH)', async () => {
    const user = await prismaService.user.create({
      data: {
        name: 'Test User',
        email: 'test2@example.com',
        password: 'password123',
        role: 'client',
        cpf: '12345678902',
      },
    });

    const updateUserDto = {
      name: 'Updated User',
    };

    const response = await request(app.getHttpServer())
      .patch(`/users/${user.id}`)
      .send(updateUserDto)
      .expect(200);

    expect(response.body.name).toBe(updateUserDto.name);
  });

  it('/users/:id (DELETE)', async () => {
    const user = await prismaService.user.create({
      data: {
        name: 'Test User',
        email: 'test3@example.com',
        password: 'password123',
        role: 'client',
        cpf: '12345678903',
      },
    });

    await request(app.getHttpServer())
      .delete(`/users/${user.id}`)
      .expect(200);

    const deletedUser = await prismaService.user.findUnique({
      where: { id: user.id },
    });

    expect(deletedUser).toBeNull();
  });

});

