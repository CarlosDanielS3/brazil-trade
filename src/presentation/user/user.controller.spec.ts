import { AddUserUseCase } from '../../usecases/user/add-user.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { HelpersModule } from '@/infrastructure/common/helper/helper.module';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { CryptoHelper } from '@/infrastructure/common/helper/crypto.helper';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [CryptoHelper, AddUserUseCase],
      imports: [HelpersModule, RepositoriesModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
