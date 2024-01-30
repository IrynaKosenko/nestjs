import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Film } from '../src/film/entities/film.entity';
import { Person } from '../src/people/entities/person.entity';
import { Planet } from '../src/planet/entities/planet.entity';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import {
  errorNotFoundStub,
  planetStubCreateDto,
  planetsStubArrayDefaultOpt,
  planetsStubArrayPage2Limit2,
  userStubRegDto,
} from './stubs-e2e';
import { PlanetModule } from '../src/planet/planet.module';
import {
  mockFilmRepository,
  mockPeopleRepository,
  mockPlanetRepository,
  mockUserRepository,
} from './mockServices-e2e';
import dataSourceTest, { dataSourceOptionsTest } from '../database/test/data-source-test';
import { APP_GUARD } from '@nestjs/core';
import JwtAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/entities/user.entity';

describe('PlanetController (e2e)', () => {
  let app: INestApplication;
  let planetRepository: Repository<Planet>;

  beforeAll(async () => {
    const planetModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        PlanetModule,
        TypeOrmModule.forRoot({
          ...dataSourceOptionsTest,
          entities: ['src/**/**/entities/*.entity.ts'],
          synchronize: true,
        }),
      ],
      providers: [
        {
          provide: getRepositoryToken(Planet),
          useValue: mockPlanetRepository,
        },
        {
          provide: getRepositoryToken(Film),
          useValue: mockFilmRepository,
        },
        {
          provide: getRepositoryToken(Person),
          useValue: mockPeopleRepository,
        },
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    app = planetModule.createNestApplication();
    await app.init();
    planetRepository = planetModule.get<Repository<Planet>>(getRepositoryToken(Planet));
  });

  afterAll(async () => {
    await dataSourceTest.destroy();
    await app.close();
  });

  it('planetRepository should be defined', () => {
    expect(planetRepository).toBeDefined();
  });

  // This test creates a new user
  //that is needed to test the methods of creating, updating, and deleting an entity.
  //This test must be run once or each time with new parameters in userStubRegDto().
  //Otherwise, there will be an error that such a user already exists.

  describe('POST /auth/register', () => {
    it('should create an user with admin role and return it', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(userStubRegDto())
        .expect(201)
        .expect((response) => {
          const { id, ...restData } = response.body.data;
          const { password, passwordRepeated, ...restDTO } = userStubRegDto();
          expect(restData).toEqual(restDTO);
        });
    });
  });

  //This test must be run each time with new parameters - nameNewPlanet.
  //Otherwise, there will be an error that such a planet already exists.

  describe('POST /planet', () => {
    it('should create a planet and return it', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'adminTest@gmail.com', password: 'adminTest' })
        .expect(201);

      const { access_token } = loginResponse.body;
      const nameNewPlanet = 'new super planet';

      return request(app.getHttpServer())
        .post('/planets')
        .set('Authorization', 'Bearer ' + access_token)
        .send({ ...planetStubCreateDto(), name: nameNewPlanet })
        .expect(201)
        .expect((responce) => {
          const { id, url, created, edited, ...restPlanet } = responce.body.data;
          expect({ ...planetStubCreateDto(), name: nameNewPlanet }).toEqual(restPlanet);
          expect(restPlanet.name).toEqual(nameNewPlanet);
        });
    });
  });

  describe('GET /planets', () => {
    let loginResponse: request.Response;
    let access_token: string;

    beforeEach(async () => {
      loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'adminTest@gmail.com', password: 'adminTest' });
      access_token = loginResponse.body.access_token;
    });

    it('should return an array of planets with default pagination options', async () => {
      return request(app.getHttpServer())
        .get('/planets')
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200)
        .expect(() => {
          expect({ data: [planetsStubArrayDefaultOpt()] });
        });
    });

    it('should return an array of planets from page 2 with limit 2', async () => {
      return request(app.getHttpServer())
        .get('/planets?page=2&limit=2')
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200)
        .expect(() => {
          expect({ data: [planetsStubArrayPage2Limit2()] });
        });
    });
    it('should return an empty array when pagination params is wrong', async () => {
      return request(app.getHttpServer())
        .get('/planets?page=2222&limit=2222')
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200)
        .expect((responce) => {
          expect(responce.body.data).toEqual([]);
        });
    });
  });

  describe('GET /planet/:id', () => {
    let loginResponse: request.Response;
    let access_token: string;
    const id = 11;

    beforeEach(async () => {
      loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'adminTest@gmail.com', password: 'adminTest' });
      access_token = loginResponse.body.access_token;
    });

    it(`should return a planet with id ${id}`, async () => {
      return request(app.getHttpServer())
        .get(`/planets/${id}`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200)
        .expect((responce) => {
          expect(responce.body.data.id).toEqual(id);
        });
    });

    it('should return an error when a planet not exists in DB', async () => {
      return request(app.getHttpServer())
        .get('/planets/155255')
        .set('Authorization', 'Bearer ' + access_token)
        .expect(404)
        .expect((response) => {
          expect(response.status).toEqual(404);
          expect(response.body).toEqual(errorNotFoundStub());
        });
    });
  });
  describe('PATCH /planets/:id', () => {
    let loginResponse: request.Response;
    let access_token: string;
    const id = 15;
    const patchedParams = 'Patched New Planet';

    beforeEach(async () => {
      loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'adminTest@gmail.com', password: 'adminTest' });
      access_token = loginResponse.body.access_token;
    });

    it(`should update planet name with id ${id}`, () => {
      return request(app.getHttpServer())
        .patch(`/planets/${id}`)
        .set('Authorization', 'Bearer ' + access_token)
        .send({ name: patchedParams })
        .expect(200)
        .expect((response) => {
          expect(response.body.data.name).toEqual(patchedParams);
        });
    });

    it('should return an error when object for update is empty', () => {
      return request(app.getHttpServer())
        .patch('/planets/50')
        .set('Authorization', 'Bearer ' + access_token)
        .send({})
        .expect(400)
        .expect((response) => {
          expect(response.status).toEqual(400);
          expect(response.body).toEqual({
            message:
              'The object to update cannot be empty. You need to fill in at least one field.',
            statusCode: 400,
          });
        });
    });

    it('should return an error when a planet not exists in DB', async () => {
      return request(app.getHttpServer())
        .get('/planets/155255')
        .set('Authorization', 'Bearer ' + access_token)
        .expect(404)
        .expect((response) => {
          expect(response.body).toEqual(errorNotFoundStub());
        });
    });
  });

  describe('DELETE /planets/:id', () => {
    let loginResponse: request.Response;
    let access_token: string;
    const id = 9;

    beforeEach(async () => {
      loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'adminTest@gmail.com', password: 'adminTest' });
      access_token = loginResponse.body.access_token;
    });

    it('should remove a planet with id', () => {
      return request(app.getHttpServer())
        .delete(`/planets/${id}`)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200)
        .expect((response) => {
          expect(response.body.data).not.toBeNull();
        });
    });

    it('should return an error when a planet not exists in DB', async () => {
      return request(app.getHttpServer())
        .get('/planets/155255')
        .set('Authorization', 'Bearer ' + access_token)
        .expect(404)
        .expect((response) => {
          expect(response.status).toEqual(404);
          expect(response.body).toEqual(errorNotFoundStub());
        });
    });
  });
});
