import { Module } from '@nestjs/common';
import { CartAppController } from './cart-app.controller';
import { CartAppService } from './cart-app.service';
import { Product } from 'libs/entities/cart/product.entity';
import { Category } from 'libs/entities/cart/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'libs/config';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.user,
      password: envs.database.password,
      database: envs.cart.databaseName,
      entities: [Product, Category],
      synchronize: true,
    }),
  ],
  controllers: [CartAppController],
  providers: [CartAppService],
})
export class CartAppModule {}
