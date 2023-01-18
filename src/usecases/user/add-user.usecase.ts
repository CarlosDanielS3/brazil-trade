import { IUserRepository } from '@/domain/user/user.repository';
import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AddUserDto } from 'src/application/user/user.dto';
import { CryptoHelper } from 'src/infrastructure/common/helper/crypto.helper';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class AddUserUseCase {
  constructor(
    @Inject(DatabaseUserRepository)
    private readonly userRepository: IUserRepository,
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
