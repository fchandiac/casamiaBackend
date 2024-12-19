import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'libs/config';
import { MissionsController } from './missions.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MISSIONS_SERVICE',  // Nombre del cliente para la inyección
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitmq.url],
          queue: 'mission_queue',
          noAck: true,
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'ACCOUNT_SERVICE',  // Nombre del cliente para la inyección
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitmq.url],
          queue: 'account_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [MissionsController],  // El controlador para manejar las rutas relacionadas con la autenticación
})
export class MissionsModule {}
