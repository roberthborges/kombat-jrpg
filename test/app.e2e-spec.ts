import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const body = {
    player1: {
      movimientos: ['SDD', 'DSD', 'SA', 'DSD'],
      golpes: ['K', 'P', 'K', 'P'],
    },
    player2: {
      movimientos: ['DSD', 'WSAW', 'ASA', '', 'ASA', 'SA'],
      golpes: ['P', 'K', 'K', 'K', 'P', 'k'],
    },
  };

  const mockResponse = {
    statusCode: 200,
    data: [
      'Tonyn se mueve y lanza una patada',
      'Arnaldor usa un Taladoken',
      'Tonyn usa un Taladoken',
      'Arnaldor se mueve y lanza una patada',
      'Tonyn conecta un Remuyuken',
      'Tonyn ha ganado la pelea y aun le queda 2 de energia',
    ],
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/battlefield')
      .send(body);
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body).toEqual(mockResponse);
  });
});
