import { Module } from '@nestjs/common';
import { AccountAppController } from './account-app.controller';
import { AccountAppService } from './account-app.service';
import { Account } from 'libs/entities/account/account.entity';
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
      entities: [Account],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Account]),
  ],
  controllers: [AccountAppController],
  providers: [AccountAppService],
})
export class AccountAppModule {}
