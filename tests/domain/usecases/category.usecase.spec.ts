import { CategoryUseCase } from '@/domain/usecases/category.usecase';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { DatabaseCategoryRepository } from '@/infrastructure/repositories/category.repository';
import { DatabaseProductRepository } from '@/infrastructure/repositories/product.repository';
import {
  AddCategoryDto,
  UpdateCategoryDto,
} from '@/presentation/category/category.dto';
import { Test } from '@nestjs/testing';
import { Category, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';

describe('categoryUseCase', () => {
  let categoryUseCase: CategoryUseCase;
  let prismaService: DeepMockProxy<PrismaClient>;
  let categoryRepository: DatabaseCategoryRepository;

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

    categoryRepository = moduleRef.get<DatabaseCategoryRepository>(
      DatabaseCategoryRepository,
    );
    categoryUseCase = moduleRef.get<CategoryUseCase>(CategoryUseCase);
    prismaService = moduleRef.get(PrismaService);
  });

  describe('create category', () => {
    it('should be able to create a new category', async () => {
      const createCategoryMock = {
        name: faker.name.firstName(),
      } as AddCategoryDto;

      const categoryMock = {
        id: 1,
        name: createCategoryMock.name,
        father_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      prismaService.category.create.mockResolvedValueOnce(categoryMock);

      await expect(categoryUseCase.create(createCategoryMock)).resolves.toEqual(
        categoryMock,
      );
    });

    it('should not be able to create a new category with an existing name', async () => {
      const createCategoryMock = {
        name: faker.name.firstName(),
        father_id: 1,
      } as AddCategoryDto;

      const categoryMock: Category = {
        id: 1,
        name: createCategoryMock.name,
        father_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest
        .spyOn(categoryRepository, 'findOneByAnyField')
        .mockResolvedValueOnce(categoryMock);
      prismaService.category.create.mockResolvedValueOnce(categoryMock);

      await expect(
        categoryUseCase.create(createCategoryMock),
      ).rejects.toThrow();
    });
  });

  describe('update category', () => {
    it('should be able to update a category', async () => {
      const createCategoryMock = {
        name: faker.name.firstName(),
      } as UpdateCategoryDto;

      const categoryMock = {
        id: 1,
        name: faker.name.firstName(),
        father_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      prismaService.category.update.mockResolvedValueOnce(categoryMock);
      jest
        .spyOn(categoryRepository, 'findById')
        .mockResolvedValueOnce(categoryMock);

      await expect(categoryUseCase.update(1, createCategoryMock)).resolves.toBe(
        void 0,
      );
    });

    it('should not be able to update a category that does not exists', async () => {
      const createCategoryMock = {
        name: faker.name.firstName(),
      } as UpdateCategoryDto;

      prismaService.category.update.mockRejectedValueOnce(
        new Error('Category not found'),
      );

      await expect(
        categoryUseCase.update(1, createCategoryMock),
      ).rejects.toThrow();
    });
    it('should not be able to update with a name that other category already have', async () => {
      const createCategoryMock = {
        name: faker.name.firstName(),
      } as UpdateCategoryDto;

      prismaService.category.update.mockRejectedValueOnce(
        new Error('Constraint violation'),
      );

      await expect(
        categoryUseCase.update(1, createCategoryMock),
      ).rejects.toThrow();
    });
  });

  describe('delete category', () => {
    it('should be able to delete a category', async () => {
      const categoryMock = {
        id: 1,
        name: faker.name.firstName(),
        father_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      prismaService.product.findMany.mockResolvedValueOnce([]);
      prismaService.category.delete.mockReturnThis();

      await expect(categoryUseCase.delete(1)).resolves.toBe(void 0);
    });

    it('should not be able to delete a category that does not exists', async () => {
      prismaService.product.findMany.mockResolvedValueOnce([]);
      prismaService.category.delete.mockRejectedValueOnce(
        new Error('Category not found'),
      );

      await expect(categoryUseCase.delete(1)).rejects.toThrow();
    });

    it('should not be able to delete a category that has items', async () => {
      const category_id = 1;
      const productsMock = [
        {
          title: faker.name.firstName(),
          description: faker.name.jobDescriptor(),
          price: 10,
          created_at: new Date(),
          updated_at: new Date(),
          id: 1,
          category_id: category_id,
        },
      ];
      prismaService.product.findMany.mockResolvedValueOnce(productsMock);
      prismaService.category.delete.mockRejectedValueOnce(
        new BadRequestException(
          `the category with id ${category_id} have relations with products ids [${productsMock
            .map((product) => product.id)
            .join(', ')}] and can't be deleted`,
        ),
      );

      await expect(categoryUseCase.delete(1)).rejects.toThrow();
    });
  });
});
