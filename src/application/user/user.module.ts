import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { AddUserUseCase } from 'src/usecases/user/add-user.usecase';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { UpdateUserUseCase } from 'src/usecases/user/update-user.usecase';
import { DeleteUserUseCase } from 'src/usecases/user/delete-user.usecase';
import { CryptoHelper } from 'src/infrastructure/common/helper/crypto.helper';
import { FindUserUseCase } from '@/usecases/user/find-user.usecase';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Module({
  imports: [UserModule, RepositoriesModule],
  controllers: [UserController],
  providers: [
    AddUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    CryptoHelper,
    FindUserUseCase,

    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [FindUserUseCase],
})
export class UserModule {}
