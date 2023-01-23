import { PrismaService } from './../../infrastructure/prisma/prisma.service';
import { CategoryController } from './category.controller';
import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { CategoryUseCase } from '@/domain/usecases/category.usecase';
import { DatabaseCategoryRepository } from '@/infrastructure/repositories/catogorie.repositorie';

@Module({
  imports: [RepositoriesModule],
  controllers: [CategoryController],
  providers: [CategoryUseCase, DatabaseCategoryRepository, PrismaService],
})
export class CategoryModule {}
