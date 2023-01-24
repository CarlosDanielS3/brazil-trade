import { Category } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { IGenericRepository } from '@/domain/repositories/generic.repository';
import {
  UpdateCategoryDto,
  AddCategoryDto,
} from '@/presentation/category/category.dto';

@Injectable()
export class DatabaseCategoryRepository
  implements IGenericRepository<Category, AddCategoryDto, UpdateCategoryDto>
{
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

  async findOneByAnyField(fields: {
    [key: string]: string | boolean | number | Date;
  }): Promise<Category> {
    return await this.prisma.category.findFirstOrThrow({
      where: fields,
    });
  }

  async findAllByAnyField(fields: {
    [key: string]: string | boolean | number | Date;
  }): Promise<Category[]> {
    return await this.prisma.category.findMany({
      where: fields,
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.prisma.category.findUniqueOrThrow({
      where: { id },
    });
    await this.prisma.category.delete({ where: { id } });
  }
}
