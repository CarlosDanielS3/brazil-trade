import { Product } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { IProductRepository } from '@/domain/repositories/product.repository';
import {
  UpdateProductDto,
  AddProductDto,
} from '@/presentation/product/product.dto';

@Injectable()
export class DatabaseProductRepository implements IProductRepository {
  constructor(private prisma: PrismaService) {}

  async update(id: number, data: UpdateProductDto): Promise<void> {
    await this.prisma.product.update({
      where: { id },
      data,
    });
  }
  async insert(product: AddProductDto): Promise<Product> {
    return this.prisma.product.create({ data: product });
  }
  async findAll(): Promise<Product[]> {
    const productEntities = await this.prisma.product.findMany({
      orderBy: { id: 'asc' },
    });
    return productEntities;
  }
  async findById(id: number): Promise<Product> {
    return await this.prisma.product.findUniqueOrThrow({
      where: { id },
    });
  }
  async deleteById(id: number): Promise<void> {
    await this.prisma.product.findUniqueOrThrow({
      where: { id },
    });
    await this.prisma.product.delete({ where: { id } });
  }
}
