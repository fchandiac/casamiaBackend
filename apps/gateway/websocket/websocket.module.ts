import { Module } from '@nestjs/common';
import { CustomWebSocketGateway } from './websocket.gateway';

@Module({
  providers: [CustomWebSocketGateway], // Incluye el Gateway como un proveedor
})
export class WebSocketModule {}
