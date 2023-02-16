import { UserUseCase } from '@/domain/usecases/user.usecase';
import { DatabaseUserRepository } from '@/infrastructure/repositories/user.repository';
import { DatabaseProductRepository } from '@/infrastructure/repositories/product.repository';
import { UpdateUserDto } from '@/presentation/user/user.dto';
import { Test } from '@nestjs/testing';
import { User, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { CryptoHelper } from '@/infrastructure/common/helper/crypto.helper';

describe('userUseCase', () => {
  let userUseCase: UserUseCase;
  let prismaService: DeepMockProxy<PrismaClient>;
  let userRepository: DatabaseUserRepository;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        UserUseCase,
        CryptoHelper,
        DatabaseUserRepository,
        DatabaseProductRepository,
        PrismaService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();
    userRepository = moduleRef.get<DatabaseUserRepository>(
      DatabaseUserRepository,
    );
    userUseCase = moduleRef.get<UserUseCase>(UserUseCase);
    prismaService = moduleRef.get(PrismaService);
  });
  describe('create user', () => {
    it('should be able to create a new user', async () => {
      const createUserMock: User = {
        id: 1,
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        created_at: new Date(),
        updated_at: new Date(),
      };
      const userMock: User = {
        id: 1,
        name: createUserMock.name,
        email: createUserMock.email,
        password: createUserMock.password,
        created_at: new Date(),
        updated_at: new Date(),
      };
      prismaService.user.create.mockResolvedValueOnce(userMock);
      await expect(userUseCase.create(createUserMock)).resolves.toEqual(
        userMock,
      );
    });
    it('should not be able to create a new user with an existing email', async () => {
      const createUserMock: User = {
        id: 1,
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        created_at: new Date(),
        updated_at: new Date(),
      };
      const userMock: User = {
        id: 1,
        name: createUserMock.name,
        email: createUserMock.email,
        password: createUserMock.password,
        created_at: new Date(),
        updated_at: new Date(),
      };
      jest
        .spyOn(userRepository, 'findOneByAnyField')
        .mockResolvedValueOnce(userMock);
      prismaService.user.create.mockResolvedValueOnce(userMock);
      await expect(userUseCase.create(createUserMock)).rejects.toThrow();
    });
  });
  describe('update user', () => {
    it('should be able to update a user', async () => {
      const updateUserMock: Pick<User, 'name'> = {
        name: faker.name.firstName(),
      };
      prismaService.user.update.mockReturnThis();
      await expect(userUseCase.update(1, updateUserMock)).resolves.toBe(void 0);
    });
    it('should not be able to update a user that does not exists', async () => {
      const createUserMock = {
        name: faker.name.firstName(),
      } as UpdateUserDto;
      prismaService.user.update.mockRejectedValueOnce(
        new Error('User not found'),
      );
      await expect(userUseCase.update(1, createUserMock)).rejects.toThrow();
    });
  });
  describe('delete user', () => {
    it('should be able to delete a user', async () => {
      prismaService.product.findMany.mockResolvedValueOnce([]);
      prismaService.user.delete.mockReturnThis();
      await expect(userUseCase.delete(1)).resolves.toBe(void 0);
    });
    it('should not be able to delete a user that does not exists', async () => {
      prismaService.product.findMany.mockResolvedValueOnce([]);
      prismaService.user.delete.mockRejectedValueOnce(
        new Error('User not found'),
      );
      await expect(userUseCase.delete(1)).rejects.toThrow();
    });
  });
});
