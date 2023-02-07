import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AddUserDto, UpdateUserDto } from '@/presentation/user/user.dto';
import { CryptoHelper } from '@helper/crypto.helper';
import { DatabaseUserRepository } from '@/infrastructure/repositories/user.repository';

@Injectable()
export class UserUseCase {
  constructor(
    private readonly userRepository: DatabaseUserRepository,
    private readonly cryptoHelper: CryptoHelper,
  ) {}

  async create(user: AddUserDto): Promise<User> {
    const userAlreadyExists = await this.userRepository
      .findOneByAnyField({ email: user.email })
      .catch(() => false);
    if (userAlreadyExists)
      throw new BadRequestException(
        `user with email ${user.email} already exists`,
      );
    const userWithHashedPassword = {
      ...user,
      password: await this.cryptoHelper.hash(user.password),
    };
    return await this.userRepository.insert(userWithHashedPassword);
  }
  async update(id: number, user: UpdateUserDto): Promise<void> {
    await this.userRepository.findOneByAnyField({ id });
    return await this.userRepository.update(id, user);
  }
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneByAnyField({ email });
  }
  async delete(id: number): Promise<void> {
    return await this.userRepository.deleteById(id);
  }
}
