import { UpdateUserDto } from '../../presentation/user/user.dto';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddUserDto } from '@/presentation/user/user.dto';
import { IGenericRepository } from '@/domain/repositories/generic.repository';

@Injectable()
export class DatabaseUserRepository
  implements IGenericRepository<User, AddUserDto, UpdateUserDto>
{
  constructor(private prisma: PrismaService) {}

  async update(id: number, data: UpdateUserDto): Promise<void> {
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

  async findOneByAnyField(fields: {
    [key: string]: string | boolean | number | Date;
  }): Promise<User> {
    return await this.prisma.user.findFirstOrThrow({
      where: fields,
    });
  }

  async findAllByAnyField(fields: {
    [key: string]: string | boolean | number | Date;
  }): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: fields,
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
    await this.prisma.user.delete({ where: { id } });
  }
}
