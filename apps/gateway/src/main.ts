import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from 'libs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Gateway');
  const app = await NestFactory.create(AppModule);
  const port = envs.gateway.port;

  // Configurar CORS
  app.enableCors({
    origin: 'http://localhost:8081', // Permitir solo el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permitir cookies si es necesario
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(port);
  logger.log(`Gateway started at http://localhost:${port}`);
}
bootstrap();
