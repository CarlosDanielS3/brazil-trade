import { IUserRepository } from '@/domain/user/user.repository';
import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseUserRepository } from '@/infrastructure/repositories/user.repository';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject(DatabaseUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
}
