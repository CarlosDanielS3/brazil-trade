import { User } from '@prisma/client';

export interface UserRepository {
  insert(user: Partial<User>): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  update(id: number, data: User): Promise<void>;
  deleteById(id: number): Promise<void>;
}
