import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AddUserDto } from 'src/application/user/user.dto';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class AddUserUseCase {
  constructor(private readonly userRepository: DatabaseUserRepository) {}

  async execute(user: AddUserDto): Promise<User> {
    return await this.userRepository.insert(user);
  }
}
