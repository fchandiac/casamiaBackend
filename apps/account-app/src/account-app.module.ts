import { Module } from '@nestjs/common';
import { AccountAppController } from '../account/account.controller';
import { AccountAppService } from '../account/account.service';
import { Account } from 'libs/entities/account/account.entity';
import { Transaction } from 'libs/entities/account/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'libs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.user,
      password: envs.database.password,
      database: envs.account.databaseName,
      entities: [Account, Transaction],
      synchronize: true,
      // dropSchema: true,
    }),
    TypeOrmModule.forFeature([Account, Transaction]),
  ],
  controllers: [AccountAppController],
  providers: [AccountAppService],
})
export class AccountAppModule {}
