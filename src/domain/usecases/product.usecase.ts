import { DatabaseCategoryRepository } from '@/infrastructure/repositories/catogorie.repositorie';
import { DatabaseProductRepository } from '@/infrastructure/repositories/product.repositorie';
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
    const category = await this.categoryRepository.findById(
      product.category_id,
    );
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
