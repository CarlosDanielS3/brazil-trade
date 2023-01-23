import { Product } from '@prisma/client';

export interface IProductRepository {
  insert(user: Partial<Product>): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  update(id: number, data: Partial<Product>): Promise<void>;
  deleteById(id: number): Promise<void>;
}
