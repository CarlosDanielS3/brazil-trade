import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserUseCase } from '@/domain/usecases/user.usecase';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { HelpersModule } from '@/infrastructure/common/helper/helper.module';

@Module({
  imports: [UserModule, RepositoriesModule, HelpersModule],
  controllers: [UserController],
  providers: [UserUseCase],
  exports: [UserUseCase],
})
export class UserModule {}
