import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMissionDto } from '../../../libs/dtos/missions/create-mission-dto';
import { CreateOneMissionDto } from 'libs/dtos/missions/create-one-mission-dto';

@Controller('missions')
export class MissionsController {
  // Inyección del cliente de RabbitMQ
  constructor(
    @Inject('MISSIONS_SERVICE') private readonly client: ClientProxy, // Inyecta el cliente registrado
    @Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientProxy,
  ) {}

  @Get('health')
  async health(): Promise<string> {
    return 'Auth Gateway Service is healthy';
  }

  @Get('MicroserviceHealth')
  async microServiceHealth(): Promise<string> {
    //@ts-ignore
    return this.client.send<string>({ cmd: 'missions-health' }, {});
    //return 'Auth Gateway Service is healthy';
  }

  @Get('findAllMissionsGroupByCode')
  async findAllMissionsGroupByCode(): Promise<any> {
    return this.client.send({ cmd: 'missions-get-missions-group-by-code' }, {});
  }

  @Get('findMissionsByAccountId')
  async findMissionsByAccountId(
    @Query('accountId') accountId: string,
  ): Promise<any> {
    return this.client.send(
      { cmd: 'missions-find-missions-by-account-id' },
      { accountId },
    );
  }

  @Post('createMission')
  async createMission(@Body() mission: CreateMissionDto): Promise<any[]> {
    try {
      // Enviar solicitud para obtener todas las cuentas
      const accounts = await this.accountClient
        .send({ cmd: 'find-all-accounts' }, {})
        .toPromise();

      // Lista de misiones creadas
      const missionsList: any[] = [];

      // Crear misiones para cada cuenta en paralelo
      await Promise.all(
        accounts.map(async (account) => {
          const data = new CreateOneMissionDto();
          data.accountId = account.id;
          data.code = mission.code;
          data.name = mission.name;
          data.description = mission.description;
          data.imageUrl = mission.imageUrl;
          data.money = mission.money;
          data.points = mission.points;

          try {
            // Llamar al microservicio para crear la misión
            const missionCreated = await this.client
              .send({ cmd: 'missions-create-one-mission' }, { dto: data })
              .toPromise();
            missionsList.push(missionCreated); // Agregar misión creada a la lista
          } catch (err) {
            console.error(
              `Error creating mission for account ${account.id}:`,
              err,
            );
            // Opcional: puedes seguir procesando las otras cuentas, o retornar un error
          }
        }),
      );

      // Devolver la lista de misiones creadas
      return missionsList;
    } catch (error) {
      console.error(
        'Error while creating missions or fetching accounts',
        error,
      );
      throw new Error('Failed to create missions or fetch accounts'); // Manejo de error
    }
  }

  @Get('findOneById')
  async findOneById(@Query('id') id: string): Promise<any> {
    return this.client.send({ cmd: 'missions-find-one-by-id' }, { id });
  }
}
