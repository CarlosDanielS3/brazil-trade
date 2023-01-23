import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AddUserDto } from '@/presentation/user/user.dto';
import { CryptoHelper } from '@Helper/crypto.helper';
import { DatabaseUserRepository } from '@/infrastructure/repositories/user.repository';

@Injectable()
export class AddUserUseCase {
  constructor(
    private readonly userRepository: DatabaseUserRepository,
    private readonly cryptoHelper: CryptoHelper,
  ) {}

  async execute(user: AddUserDto): Promise<User> {
    const userAlreadyExists = await this.userRepository
      .findByEmail(user.email)
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
}
