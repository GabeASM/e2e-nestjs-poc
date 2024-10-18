import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CypherController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/cypher/encrypt (POST) should encrypt text', async () => {
    const response = await request(app.getHttpServer())
      .post('/cypher/encrypt')
      .send({
        text: 'Hello World',
        key: 'mySecretKey',
        keyword: 'exampleKeyword',
      })
      .expect(201);

    expect(response.body).toHaveProperty('encryptedText');
    expect(typeof response.body.encryptedText).toBe('string');
  });

  it('/cypher/decrypt (POST) should decrypt text', async () => {

    const encryptResponse = await request(app.getHttpServer())
      .post('/cypher/encrypt')
      .send({
        text: 'Hello World',
        key: 'mySecretKey',
        keyword: 'exampleKeyword',
      })
      .expect(201);

    const encryptedText = encryptResponse.body.encryptedText;
    const decryptResponse = await request(app.getHttpServer())
      .post('/cypher/decrypt')
      .send({
        encryptedText: encryptedText,
        key: 'mySecretKey',
      })
      .expect(201);

    expect(decryptResponse.body).toHaveProperty('decryptedText');
    expect(decryptResponse.body.decryptedText).toBe('Hello World');
  });

  it('/cypher (GET) should return all encrypted texts', async () => {
    const response = await request(app.getHttpServer())
      .get('/cypher')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('textEncrypted');
      expect(response.body[0]).toHaveProperty('kerWord');
    }
  });
  it('/cypher/decrypt (POST) should return 400 with incorrect key', async () => {
    const encryptResponse = await request(app.getHttpServer())
      .post('/cypher/encrypt')
      .send({
        text: 'Secret Message',
        key: 'correctKey',
        keyword: 'exampleKeyword',
      })
      .expect(201);

    const encryptedText = encryptResponse.body.encryptedText;

    await request(app.getHttpServer())
      .post('/cypher/decrypt')
      .send({
        encryptedText: encryptedText,
        key: 'wrongKey',
      })
      .expect(400);
  });

  it('/cypher/decrypt (POST) should return 400 when trying to decrypt a non-encrypted text', async () => {
    await request(app.getHttpServer())
      .post('/cypher/decrypt')
      .send({
        encryptedText: 'NotEncryptedText',
        key: 'randomKey',
      })
      .expect(400);
  });


  it('/cypher/encrypt (POST) should return encrypted text of expected length', async () => {
    const response = await request(app.getHttpServer())
      .post('/cypher/encrypt')
      .send({
        text: 'Short Text',
        key: 'secureKey',
        keyword: 'keywordTest',
      })
      .expect(201);

    expect(response.body).toHaveProperty('encryptedText');
    expect(response.body.encryptedText.length).toBeGreaterThan(10);
  });


  it('should return 404 for non-existent route', async () => {
    await request(app.getHttpServer())
      .get('/non-existent-route')
      .expect(404);
  });
});
