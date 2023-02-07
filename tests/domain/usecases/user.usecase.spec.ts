import { UserUseCase } from '@/domain/usecases/user.usecase';
import { DatabaseUserRepository } from '@/infrastructure/repositories/user.repository';
import { DatabaseProductRepository } from '@/infrastructure/repositories/product.repository';
import { UpdateUserDto } from '@/presentation/user/user.dto';
import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import prisma from '@test/mock/prisma/prisma-service.mock';
import { faker } from '@faker-js/faker';
import { CryptoHelper } from '@/infrastructure/common/helper/crypto.helper';
import { describe, it, vi, beforeAll,expect } from 'vitest';

describe('userUseCase', () => {
  let userUseCase: UserUseCase;
  let userRepository: DatabaseUserRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        UserUseCase,
        CryptoHelper,
        DatabaseUserRepository,
        DatabaseProductRepository,
      ],
    })
      .compile();

    userRepository = moduleRef.get<DatabaseUserRepository>(
      DatabaseUserRepository,
    );
    userUseCase = moduleRef.get<UserUseCase>(UserUseCase);
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
      prisma.user.create.mockResolvedValueOnce(userMock);

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

      vi
        .spyOn(userRepository, 'findOneByAnyField')
        .mockResolvedValueOnce(userMock);
        prisma.user.create.mockResolvedValueOnce(userMock);

      await expect(userUseCase.create(createUserMock)).rejects.toThrow();
    });
  });

  describe('update user', () => {
    it('should be able to update a user', async () => {
      const updateUserMock: Pick<User, 'name'> = {
        name: faker.name.firstName(),
      };
      prisma.user.update.mockReturnThis();

      await expect(userUseCase.update(1, updateUserMock)).resolves.toBe(void 0);
    });

    it('should not be able to update a user that does not exists', async () => {
      const createUserMock = {
        name: faker.name.firstName(),
      } as UpdateUserDto;

      prisma.user.update.mockRejectedValueOnce(
        new Error('User not found'),
      );

      await expect(userUseCase.update(1, createUserMock)).rejects.toThrow();
    });
  });

  describe('delete user', () => {
    it('should be able to delete a user', async () => {
      prisma.product.findMany.mockResolvedValueOnce([]);
      prisma.user.delete.mockReturnThis();

      await expect(userUseCase.delete(1)).resolves.toBe(void 0);
    });

    it('should not be able to delete a user that does not exists', async () => {
      prisma.product.findMany.mockResolvedValueOnce([]);
      prisma.user.delete.mockRejectedValueOnce(
        new Error('User not found'),
      );

      await expect(userUseCase.delete(1)).rejects.toThrow();
    });
  });
});
