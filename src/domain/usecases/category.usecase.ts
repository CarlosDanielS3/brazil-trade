import { DatabaseCategoryRepository } from '@/infrastructure/repositories/catogorie.repositorie';
import {
  AddCategoryDto,
  UpdateCategoryDto,
} from '@/presentation/category/category.dto';
import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryUseCase {
  constructor(
    private readonly categoryRepository: DatabaseCategoryRepository,
  ) {}
  async create(category: AddCategoryDto): Promise<Category> {
    return await this.categoryRepository.insert(category);
  }
  async update(id: number, category: UpdateCategoryDto): Promise<void> {
    await this.categoryRepository.findById(id);
    return await this.categoryRepository.update(id, category);
  }

  async delete(id: number): Promise<void> {
    return await this.categoryRepository.deleteById(id);
  }
}
