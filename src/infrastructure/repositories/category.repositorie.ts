import { Category } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { ICategoryRepository } from '@/domain/repositories/category.repository';
import {
  UpdateCategoryDto,
  AddCategoryDto,
} from '@/presentation/category/category.dto';

@Injectable()
export class DatabaseCategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaService) {}

  async update(id: number, data: UpdateCategoryDto): Promise<void> {
    await this.prisma.category.update({
      where: { id },
      data,
    });
  }
  async insert(category: AddCategoryDto): Promise<Category> {
    return this.prisma.category.create({ data: category });
  }
  async findAll(): Promise<Category[]> {
    const categoryEntities = await this.prisma.category.findMany({
      orderBy: { id: 'asc' },
    });
    return categoryEntities;
  }
  async findById(id: number): Promise<Category> {
    return await this.prisma.category.findUniqueOrThrow({
      where: { id },
    });
  }
  async deleteById(id: number): Promise<void> {
    await this.prisma.category.findUniqueOrThrow({
      where: { id },
    });
    await this.prisma.category.delete({ where: { id } });
  }
}
