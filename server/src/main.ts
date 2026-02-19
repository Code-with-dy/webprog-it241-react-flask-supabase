import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let server;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();
  return app.getHttpAdapter().getInstance();
}

export default async function handler(req, res) {
  if (!server) {
    server = await bootstrap();
  }
  return server(req, res);
}
