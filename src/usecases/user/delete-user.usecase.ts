import { Injectable } from '@nestjs/common';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: DatabaseUserRepository) {}

  async execute(id: number): Promise<void> {
    return await this.userRepository.deleteById(id);
  }
}
