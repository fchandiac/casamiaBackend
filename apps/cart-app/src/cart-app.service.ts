import { Injectable } from '@nestjs/common';
import { Product } from 'libs/entities/cart/product.entity';
import { Category } from 'libs/entities/cart/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from '../../../libs/dtos/cart/category/create-category.dto';
import { CreateProductDto } from '../../../libs/dtos/cart/product/create-product.dto';

@Injectable()
export class CartAppService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category) // Corrección del nombre del repositorio y sintaxis
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async health(): Promise<string> {
    return 'Cart Microservice is healthy';
  }

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async createProduct(product: CreateProductDto): Promise<Product> {

    const category = await this.categoryRepository.findOne({
      where: { id: product.categoryId },
    });

    const newProduct = this.productRepository.create(product);
    newProduct.category = category;
    return this.productRepository.save(newProduct);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }
}
