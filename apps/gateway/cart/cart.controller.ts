import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCategoryDto } from '../../../libs/dtos/cart/category/create-category.dto';
import { CreateProductDto } from '../../../libs/dtos/cart/product/create-product.dto';


@Controller('cart')
export class CartController {
  // Inyección del cliente de RabbitMQ
  constructor(
    @Inject('CART_SERVICE') private readonly client: ClientProxy, // Inyecta el cliente registrado
  ) {}

  @Get('cartMicroserviceHealth')
  async microServiceHealth(): Promise<string> {
    //@ts-ignore
    return this.client.send<string>({ cmd: 'cart-health' }, {});
    //return 'Auth Gateway Service is healthy';
  }

  @Get('health')
  async health(): Promise<string> {
    return 'Cart Gateway Service is healthy';
  }

  @Post('createCategory')
  async createCategory(@Body() category: CreateCategoryDto): Promise<any> {
    return this.client.send({ cmd: 'cart-create-category' }, { dto: category });
  }

  @Get('findAllCategories')
  async findAllCategories(): Promise<any> {
    return this.client.send({ cmd: 'cart-get-categories' }, {});
  }

  @Post('createProduct')
  async createProduct(@Body() product: CreateProductDto): Promise<any> {
    return this.client.send({ cmd: 'cart-create-product' }, { dto: product });
  }

  @Get('findAllProducts')
  async findAllProducts(): Promise<any> {
    return this.client.send({ cmd: 'cart-get-products' }, {});
  }
}
