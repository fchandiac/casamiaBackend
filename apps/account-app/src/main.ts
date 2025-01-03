import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { envs } from 'libs/config';  // Importar variables de entorno
import { AccountAppModule } from './account-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AccountAppModule, {
    transport: Transport.RMQ,  // Usamos RabbitMQ como transporte
    options: {
      urls: [envs.rabbitmq.url],  // URL de RabbitMQ
      queue: 'account_queue',        // Nombre de la cola
      noAck: true,
      queueOptions: {
        durable: true,  // La cola debe ser durable
      },
    },
  });

  await app.listen();
  const logger = new Logger('AccountAppMicroservice');
  logger.log('AccountApp microservice is running...');
}
bootstrap();
