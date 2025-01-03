// apps/gateway/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'libs/config';

@Module({
  imports: [
    ClientsModule.register([
        {
          name: 'CART_SERVICE',  // Nombre del cliente para la inyección
          transport: Transport.RMQ,
          options: {
            urls: [envs.rabbitmq.url],
            queue: 'cart_queue',
            noAck: true,
            queueOptions: {
              durable: true,
            },
          },
        },
      ]),
  ],
  controllers: [CartController],  // El controlador para manejar las rutas relacionadas con la autenticación
})
export class CartModule {}
