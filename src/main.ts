import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add /api prefix to all routes
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
