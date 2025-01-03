import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from 'libs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Gateway');
  const app = await NestFactory.create(AppModule);
  const port = envs.gateway.port;  // Aquí defines el puerto como 3001

  // Configurar CORS
  app.enableCors({
    origin: '*', // Permitir solo el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permitir cookies si es necesario
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(port); // Levanta la aplicación en el puerto 3001
  logger.log(`Gateway started at http://localhost:${port}`);
}
bootstrap();
