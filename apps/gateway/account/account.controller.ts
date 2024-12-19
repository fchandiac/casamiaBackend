import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAccountDto } from 'libs/dtos/account/create-account.dto';

@Controller('account')
export class AccountController {
    constructor(@Inject('ACCOUNT_SERVICE') private readonly client: ClientProxy) { }

    @Get('health')
    healthCheck() {
        return this.client.send<string>({ cmd: 'account-health' }, {});
    }

    @Post('create')
    createAccount(@Body() dto: CreateAccountDto) {
        return this.client.send({ cmd: 'create-account' }, dto);
    }

    @Get('findAllAccounts')
    findAllAccounts() {
        return this.client.send({ cmd: 'find-all-accounts' }, {});
    }

    @Get('findByEmail')
    findAccountByEmail(@Query('email') email: string) {
        return this.client.send({ cmd: 'find-account-by-email' }, email);
    }

    @Get('isProfileComplete')
    isProfileComplete(@Query('email') email: string) {
        return this.client.send({ cmd: 'is-profile-complete' }, email);
    }


    @Post('updateUserName')
    updateUserName(@Body() data: any) {
        return this.client.send({ cmd: 'update-user-name' }, data);
    }

    

    
}