import { DatabaseCategoryRepository } from '@/infrastructure/repositories/category.repository';
import { DatabaseProductRepository } from '@/infrastructure/repositories/product.repository';
import {
  AddCategoryDto,
  UpdateCategoryDto,
} from '@/presentation/category/category.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryUseCase {
  constructor(
    private readonly categoryRepository: DatabaseCategoryRepository,
    private readonly productRepository: DatabaseProductRepository,
  ) {}
  async create(category: AddCategoryDto): Promise<Category> {
    console.log(this.categoryRepository)
    const categoryExists = await this.categoryRepository.findOneByAnyField({
      name: category.name,
    });

    if (categoryExists && categoryExists.father_id == category.father_id)
      throw new BadRequestException('category already exists');

    return await this.categoryRepository.insert(category);
  }
  async update(id: number, category: UpdateCategoryDto): Promise<void> {
    await this.categoryRepository.findById(id);
    return await this.categoryRepository.update(id, category);
  }

  async delete(id: number): Promise<void> {
    const products = await this.productRepository.findAllByAnyField({
      category_id: id,
    });
    if (products.length)
      throw new BadRequestException(
        `the category with id [${id}] have relations with products ids [${products
          .map((product) => product.id)
          .join(', ')}] and can't be deleted`,
      );

    return await this.categoryRepository.deleteById(id);
  }
}
