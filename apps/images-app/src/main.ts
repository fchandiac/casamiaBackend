import { NestFactory } from '@nestjs/core';
import { ImagesAppModule } from './images-app.module';

async function bootstrap() {
  const app = await NestFactory.create(ImagesAppModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
