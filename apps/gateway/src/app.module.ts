import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { CartModule } from '../cart/cart.module';
import { MissionsModule } from '../missions/missions.module';
import { WebSocketModule } from '../websocket/websocket.module'; // Importa el módulo de WebSockets

@Module({
  imports: [AccountModule, CartModule, MissionsModule, WebSocketModule], // Agrega WebsocketModule
  controllers: [],
  providers: [],
})
export class AppModule {}
