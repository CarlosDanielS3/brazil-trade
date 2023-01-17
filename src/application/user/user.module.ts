import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { AddUserUseCase } from 'src/usecases/user/add-user.usecase';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { UpdateUserUseCase } from 'src/usecases/user/update-user.usecase';
import { DeleteUserUseCase } from 'src/usecases/user/delete-user.usecase';

@Module({
  imports: [UserModule, RepositoriesModule],
  controllers: [UserController],
  providers: [AddUserUseCase, UpdateUserUseCase, DeleteUserUseCase],
})
export class UserModule {}
