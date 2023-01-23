import { IUserRepository } from '@/domain/user/user.repository';
import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '@/presentation/user/user.dto';
import { DatabaseUserRepository } from '@/infrastructure/repositories/user.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(DatabaseUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number, user: UpdateUserDto): Promise<void> {
    return await this.userRepository.update(id, user);
  }
}
