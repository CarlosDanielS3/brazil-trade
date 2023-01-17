import { User } from '@prisma/client';
import { UserRepository } from './../../domain/user/user.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddUserDto } from 'src/application/user/user.dto';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async update(id: number, data: User): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data,
    });
  }
  async insert(user: AddUserDto): Promise<User> {
    return this.prisma.user.create({ data: user });
  }
  async findAll(): Promise<User[]> {
    const userEntities = await this.prisma.user.findMany({
      orderBy: { id: 'asc' },
    });
    return userEntities;
  }
  async findById(id: number): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }
  async deleteById(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
