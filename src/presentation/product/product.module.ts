import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { ProductUseCase } from '@/domain/usecases/product.usecase';
import { DatabaseProductRepository } from '@/infrastructure/repositories/product.repositorie';
import { DatabaseCategoryRepository } from '@/infrastructure/repositories/catogorie.repositorie';

@Module({
  imports: [RepositoriesModule],
  controllers: [ProductController],
  providers: [
    ProductUseCase,
    DatabaseProductRepository,
    PrismaService,
    DatabaseCategoryRepository,
  ],
})
export class ProductModule {}
