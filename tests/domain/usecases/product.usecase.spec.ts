import { ProductUseCase } from '@/domain/usecases/product.usecase';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import {
  AddProductDto,
  UpdateProductDto,
} from '@/presentation/product/product.dto';
import { Test } from '@nestjs/testing';
import { Product, PrismaClient, Category } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { faker } from '@faker-js/faker';
import { DatabaseProductRepository } from '@/infrastructure/repositories/product.repository';
import { DatabaseCategoryRepository } from '@/infrastructure/repositories/category.repository';

describe('productUseCase', () => {
  let productUseCase: ProductUseCase;
  let prismaService: DeepMockProxy<PrismaClient>;
  let categoryRepository: DatabaseCategoryRepository;
  let productRepository: DatabaseProductRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        ProductUseCase,
        DatabaseCategoryRepository,
        DatabaseProductRepository,
        PrismaService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    productRepository = moduleRef.get<DatabaseProductRepository>(
      DatabaseProductRepository,
    );
    productUseCase = moduleRef.get<ProductUseCase>(ProductUseCase);
    categoryRepository = moduleRef.get<DatabaseCategoryRepository>(
      DatabaseCategoryRepository,
    );
    prismaService = moduleRef.get(PrismaService);
  });

  describe('create product', () => {
    it('should be able to create a new product with an existant category', async () => {
      const categoryMock = {
        id: 1,
        father_id: null,
        name: 'category test',
        created_at: new Date(),
        updated_at: new Date(),
      } as Category;

      const createProductMock = {
        name: faker.name.firstName(),
        category_id: categoryMock.id,
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        title: faker.commerce.productName(),
      } as AddProductDto;

      const productMock = {
        id: 1,
        category_id: categoryMock.id,
        description: createProductMock.description,
        price: createProductMock.price,
        title: createProductMock.title,
        created_at: new Date(),
        updated_at: new Date(),
      };
      prismaService.product.create.mockResolvedValueOnce(productMock);
      jest
        .spyOn(categoryRepository, 'findById')
        .mockResolvedValueOnce(categoryMock);

      await expect(productUseCase.create(createProductMock)).resolves.toEqual(
        productMock,
      );
    });

    it('should not be able to create a new product with a non existant category', async () => {
      const createProductMock = {
        name: faker.name.firstName(),
        category_id: 999,
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        title: faker.commerce.productName(),
      } as AddProductDto;

      prismaService.category.findUniqueOrThrow.mockRejectedValueOnce(
        new Error(),
      );

      await expect(productUseCase.create(createProductMock)).rejects.toThrow();
    });
  });

  describe('update product', () => {
    it('should be able to update a product with an existant category', async () => {
      const categoryMock = {
        id: 1,
        father_id: null,
        name: 'category test',
        created_at: new Date(),
        updated_at: new Date(),
      } as Category;

      const updateProductMock = {
        category_id: categoryMock.id,
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        title: faker.commerce.productName(),
      } as UpdateProductDto;

      const productMock = {
        id: 1,
        category_id: categoryMock.id,
        description: updateProductMock.description,
        price: updateProductMock.price,
        title: updateProductMock.title,
        created_at: new Date(),
        updated_at: new Date(),
      } as Product;

      jest
        .spyOn(categoryRepository, 'findById')
        .mockResolvedValueOnce(categoryMock);
      jest
        .spyOn(productRepository, 'findById')
        .mockResolvedValueOnce(productMock);
      prismaService.product.update.mockResolvedValueOnce(productMock);

      await expect(
        productUseCase.update(productMock.id, updateProductMock),
      ).resolves.toBe(void 0);
    });

    it('should not be able to update a product that does not exists', async () => {
      const updateProductMock = {
        title: faker.commerce.productName(),
      } as UpdateProductDto;

      prismaService.product.update.mockRejectedValueOnce(
        new Error('Product not found'),
      );

      await expect(
        productUseCase.update(1, updateProductMock),
      ).rejects.toThrow();
    });

    it('should not be able to update a product with a category that does not exists', async () => {
      const updateProductMock = {
        category_id: 999,
      } as UpdateProductDto;

      jest
        .spyOn(categoryRepository, 'findById')
        .mockRejectedValueOnce(new Error());

      await expect(
        productUseCase.update(1, updateProductMock),
      ).rejects.toThrow();
    });
  });

  describe('delete product', () => {
    it('should be able to delete a product', async () => {
      prismaService.product.delete.mockReturnThis();

      await expect(productUseCase.delete(1)).resolves.toBe(void 0);
    });

    it('should not be able to delete a product that does not exists', async () => {
      prismaService.product.delete.mockRejectedValueOnce(
        new Error('Product not found'),
      );

      await expect(productUseCase.delete(1)).rejects.toThrow();
    });
  });
});
