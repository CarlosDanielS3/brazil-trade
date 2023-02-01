import { CategoryUseCase } from '@/domain/usecases/category.usecase';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { DatabaseCategoryRepository } from '@/infrastructure/repositories/category.repository';
import { DatabaseProductRepository } from '@/infrastructure/repositories/product.repository';
import { AddCategoryDto } from '@/presentation/category/category.dto';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

describe('AuthController', () => {
  let categoryUseCase: CategoryUseCase;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        CategoryUseCase,
        DatabaseCategoryRepository,
        DatabaseProductRepository,
        PrismaService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    categoryUseCase = moduleRef.get<CategoryUseCase>(CategoryUseCase);
    prismaService = moduleRef.get(PrismaService);
  });

  describe('create', () => {
    it('should be able to create a new category', async () => {
      const createCategory = {
        name: 'General Category',
      } as AddCategoryDto;

      prismaService.category.create.mockResolvedValueOnce({
        id: 1,
        name: 'teste',
        father_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const category = await categoryUseCase.create(createCategory);

      expect(category).toHaveProperty('id');
    });
  });
});
