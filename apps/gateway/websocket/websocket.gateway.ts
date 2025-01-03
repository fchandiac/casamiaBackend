import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway( {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class CustomWebSocketGateway {
  @SubscribeMessage('Validate mission')
  handleValidateMission(@MessageBody() data: any, @ConnectedSocket() client: Socket): string {
    console.log('Received mission data:', data);
    return 'Mission Validated';
  }
}
