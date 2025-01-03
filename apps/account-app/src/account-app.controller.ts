import { Controller} from '@nestjs/common';
import { AccountAppService } from './account-app.service';
import {
  MessagePattern,
  Payload,
  RmqContext,
  Ctx,
  RpcException,
} from '@nestjs/microservices';



@Controller()
export class AccountAppController {
  constructor(private readonly accountAppService: AccountAppService) {}

  @MessagePattern({ cmd: 'account-health' })
  async health(): Promise<string> {
    return this.accountAppService.health();
  }

  //createAccount
  @MessagePattern({ cmd: 'create-account' })
  async createAccount(@Payload() dto: any, @Ctx() context: RmqContext): Promise<any> {
    try {
      return this.accountAppService.createAccount(dto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  //findAccountByEmail
  @MessagePattern({ cmd: 'find-account-by-email' })
  async findAccountByEmail(@Payload() email: string, @Ctx() context: RmqContext): Promise<any> {
    try {
      return this.accountAppService.findAccountByEmail(email);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
  //isProfileComplete
  @MessagePattern({ cmd: 'is-profile-complete' })
  async isProfileComplete(@Payload() email: string, @Ctx() context: RmqContext): Promise<any> {
    try {
      return this.accountAppService.isProfileComplete(email);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // updateUserName(email: string, userName: string)
  @MessagePattern({ cmd: 'update-user-name' })
  async updateUserName(@Payload() data: any, @Ctx() context: RmqContext): Promise<any> {
    try {
      return this.accountAppService.updateUserName(data.email, data.userName);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // findAllAccounts
  @MessagePattern({ cmd: 'find-all-accounts' })
  async findAllAccounts(@Payload() data: any, @Ctx() context: RmqContext): Promise<any> {
    try {
      return this.accountAppService.findAllAccounts();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }



  @MessagePattern({ cmd: 'update-money-points' })
  async updateMoneyAndPoints(@Payload() dto: any, @Ctx() context: RmqContext): Promise<any> {
    try {
      return this.accountAppService.updateMoneyAndPoints(dto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
