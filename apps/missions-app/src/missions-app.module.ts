import { Module } from '@nestjs/common';
import { MissionsAppController } from './missions-app.controller';
import { MissionsAppService } from './missions-app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'libs/config';
import { Mission } from '../../../libs/entities/mission/mission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mission]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.user,
      password: envs.database.password,
      database: envs.mission.databaseName,
      entities: [Mission],
      synchronize: true,
    }),
  ],
  controllers: [MissionsAppController],
  providers: [MissionsAppService],
})
export class MissionsAppModule {}





// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Product, Category]),
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: envs.database.host,
//       port: envs.database.port,
//       username: envs.database.user,
//       password: envs.database.password,
//       database: envs.cart.databaseName,
//       entities: [Product, Category],
//       synchronize: true,
//     }),
//   ],
//   controllers: [CartAppController],
//   providers: [CartAppService],
// })
// export class CartAppModule {}
