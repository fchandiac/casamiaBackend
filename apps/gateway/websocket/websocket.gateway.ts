import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(3000, {
  cors: {
    origin: '*',  // Permitir todos los orígenes
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class CustomWebSocketGateway {
  
  // Escuchar el evento 'Validate mission'
  @SubscribeMessage('Validate mission')
  handleValidateMission(@MessageBody() data: any, @ConnectedSocket() client: Socket): string {
    console.log('Received mission validation data:', data); // Verifica si los datos se reciben correctamente
    
    if (!data) {
      console.error('No data received');
    }

    // Lógica para validar la misión
    // Aquí puedes hacer lo que necesites con los datos que recibes, como validarlos o procesarlos

    // Enviar una respuesta
    return `Mission validated: ${JSON.stringify(data)}`;
  }
}
