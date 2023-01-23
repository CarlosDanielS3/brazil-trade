import { User } from '@prisma/client';

export interface IUserRepository {
  insert(user: Partial<User>): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(id: number, data: Partial<User>): Promise<void>;
  deleteById(id: number): Promise<void>;
}
