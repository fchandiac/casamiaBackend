import { Controller, Get } from '@nestjs/common';

import {
  MessagePattern,
  Payload,
  RmqContext,
  Ctx,
  RpcException,
} from '@nestjs/microservices';
import { MissionsAppService } from './missions-app.service';

@Controller()
export class MissionsAppController {
  constructor(private readonly missionsAppService: MissionsAppService) {}

  @MessagePattern({ cmd: 'missions-health' })
  async health(): Promise<string> {
    return this.missionsAppService.health();
  }

  @MessagePattern({ cmd: 'missions-get-missions-group-by-code' })
  async getMissionsGroupByCode(): Promise<any> {
    const missions = await this.missionsAppService.findAllMissionsGroupByCode();
    return missions;
  }

  @MessagePattern({ cmd: 'missions-create-one-mission' })
  async createMission(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<any> {
    const mission = await this.missionsAppService.createMission(data.dto);
    return mission;
  }

  @MessagePattern({ cmd: 'missions-find-missions-by-account-id' })
  async findMissionsByAccountId(
    @Payload() accountId: string,
    @Ctx() context: RmqContext,
  ): Promise<any> {
    const missions =
      await this.missionsAppService.findMissionsByAccountId(accountId);
    return missions;
  }

  @MessagePattern({ cmd: 'missions-find-one-by-id' })
  async findOneById(
    @Payload() id: string,
    @Ctx() context: RmqContext,
  ): Promise<any> {
    const mission = await this.missionsAppService.findOneById(id);
    return mission;
  }
}

//save
