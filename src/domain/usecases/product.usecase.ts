import { DatabaseCategoryRepository } from '@/infrastructure/repositories/category.repository';
import { DatabaseProductRepository } from '@/infrastructure/repositories/product.repository';
import {
  AddProductDto,
  UpdateProductDto,
} from '@/presentation/product/product.dto';

import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';

@Injectable()
export class ProductUseCase {
  constructor(
    private readonly productRepository: DatabaseProductRepository,
    private readonly categoryRepository: DatabaseCategoryRepository,
  ) {}

  async create(product: AddProductDto): Promise<Product> {
    await this.categoryRepository.findById(product.category_id);
    return await this.productRepository.insert(product);
  }
  async update(id: number, product: UpdateProductDto): Promise<void> {
    await this.productRepository.findById(id);
    return await this.productRepository.update(id, product);
  }
  async delete(id: number): Promise<void> {
    return await this.productRepository.deleteById(id);
  }
}
