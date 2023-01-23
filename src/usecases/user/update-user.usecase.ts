import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '@/presentation/user/user.dto';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: DatabaseUserRepository) {}

  async execute(id: number, user: UpdateUserDto): Promise<void> {
    return await this.userRepository.update(id, user);
  }
}
