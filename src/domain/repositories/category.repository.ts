import { Category } from '@prisma/client';

export interface ICategoryRepository {
  insert(Category: Partial<Category>): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category>;
  update(id: number, data: Partial<Category>): Promise<void>;
  deleteById(id: number): Promise<void>;
}
