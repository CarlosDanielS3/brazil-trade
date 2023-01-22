import { Injectable } from '@nestjs/common';
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
    const userWithHashedPassword = {
      ...user,
      password: await this.cryptoHelper.hash(user.password),
    };
    return await this.userRepository.insert(userWithHashedPassword);
  }
}
