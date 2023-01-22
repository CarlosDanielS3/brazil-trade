import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { AddUserUseCase } from '@/domain/usecases/user/add-user.usecase';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { UpdateUserUseCase } from '@/domain/usecases/user/update-user.usecase';
import { DeleteUserUseCase } from '@/domain/usecases/user/delete-user.usecase';
import { FindUserUseCase } from '@/domain/usecases/user/find-user.usecase';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { HelpersModule } from '@/infrastructure/common/helper/helper.module';

@Module({
  imports: [UserModule, RepositoriesModule, HelpersModule],
  controllers: [UserController],
  providers: [
    AddUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    FindUserUseCase,

    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [FindUserUseCase],
})
export class UserModule {}
