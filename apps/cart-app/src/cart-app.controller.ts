import { Controller, Get } from '@nestjs/common';
import { CartAppService } from './cart-app.service';
import { CreateCategoryDto } from '../../../libs/dtos/cart/category/create-category.dto';
import {
  MessagePattern,
  Payload,
  RmqContext,
  Ctx,
  RpcException,
} from '@nestjs/microservices';

@Controller()
export class CartAppController {
  constructor(private readonly cartAppService: CartAppService) {}

  // Maneja el mensaje de salud (health check)
  @MessagePattern({ cmd: 'cart-health' })
  async health(): Promise<string> {
    return this.cartAppService.health();
  }

  @MessagePattern({ cmd: 'cart-create-category' })
  async createCategory(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<any> {
    const category = await this.cartAppService.createCategory(data.dto);
    return category;
  }

  @MessagePattern({ cmd: 'cart-get-categories' })
  async getCategories(): Promise<any> {
    const categories = await this.cartAppService.findAllCategories();
    return categories;
  }

  @MessagePattern({ cmd: 'cart-create-product' })
  async createProduct(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      const product = await this.cartAppService.createProduct(data.dto);
      return product;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'cart-get-products' })
  async getProducts(): Promise<any> {
    const products = await this.cartAppService.findAllProducts();
    return products;
  }
}
