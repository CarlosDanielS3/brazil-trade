import { IUserRepository } from '@/domain/user/user.repository';
import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(DatabaseUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return await this.userRepository.deleteById(id);
  }
}
