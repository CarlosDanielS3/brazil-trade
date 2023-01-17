import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { AddUserUseCase } from 'src/usecases/user/add-user.usecase';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';

@Module({
  imports: [UserModule, RepositoriesModule],
  controllers: [UserController],
  providers: [AddUserUseCase],
})
export class UserModule {}
