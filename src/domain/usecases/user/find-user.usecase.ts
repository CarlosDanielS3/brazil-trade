import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseUserRepository } from '@/infrastructure/repositories/user.repository';

@Injectable()
export class FindUserUseCase {
  constructor(private readonly userRepository: DatabaseUserRepository) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
}
