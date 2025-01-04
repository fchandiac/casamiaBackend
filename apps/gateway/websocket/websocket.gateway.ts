import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class CustomWebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private connectedUsers: Map<string, string> = new Map(); // Mapa de socketId a userId

  private server: Server;

  // Manejar conexión del cliente
  handleConnection(client: Socket) {
    const email = client.handshake.query.email;
    if (email) {
      //@ts-ignore
      this.connectedUsers.set(client.id, { email }); // Asociar el socketId al email
      console.log(`User connected with clientId: ${client.id}`);
      console.log(`User connected with email: ${email}`);
    } else {
      console.log('No email provided during connection');
    }
  }

  // Manejar desconexión del cliente
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedUsers.delete(client.id); // Eliminamos la relación cuando se desconecta
    console.log(`User with clientId: ${client.id} disconnected`);
  }

  // Validar misión con el `userId` (en este caso, usamos el `socket.id` como `userId`)
  @SubscribeMessage('Validate mission')
  handleValidateMission(
    @MessageBody() data: { clientId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Received mission data:', data);

    const { clientId } = data;

    this.server.to(clientId).emit('updateAccount', {
        data: 'Mission validated',
    });

  }

  // Enviar notificación a un usuario por `socket.id`
  sendNotificationToUser(userId: string, event: string, payload: any) {
    const targetSocketId = this.connectedUsers.get(userId);
    if (targetSocketId) {
      this.server.to(targetSocketId).emit(event, payload);
    } else {
      console.log(`User ${userId} is not connected.`);
    }
  }

  // Inicializar el servidor y obtener la instancia
  afterInit(server: Server) {
    this.server = server; // Guarda la instancia del servidor Socket.IO
  }
}
