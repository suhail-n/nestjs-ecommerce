import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { AppService } from "../src/app.service";
import { RegisterDTO } from '../src/auth/auth.dto';

describe('AppController (e2e)', () => {
  // let app = "http://localhost:3000";
  let app: INestApplication;
  let appService = { getHello: () => 'Hello World!' };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });
  describe("HOME", () => {
    it('should request / (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  })

  describe("AUTH", () => {
    it("should resgister user", () => {
      const user: RegisterDTO = {
        username: "user3",
        password: "secret"
      }
      console.log("Hello World")
      return request(app.getHttpServer())
        .post("/auth/register")
        .set("Accept", "application/json")
        .send(user)
        .expect(({ body }) => {
          console.log(body);
          expect(body).toBeDefined();
        })
        .expect(HttpStatus.CREATED)
    });
  })

  afterAll(async () => {
    await app.close();
  });
});
