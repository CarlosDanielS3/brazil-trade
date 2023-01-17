import { Body, Controller, Post } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserUseCase } from 'src/usecases/user/add-user.usecase';
import { AddUserDto } from './user.dto';
import { UserPresenter } from './user.presenter';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(private readonly addUserUseCase: AddUserUseCase) {}
  @Post()
  async createNewUser(@Body() body: AddUserDto): Promise<UserPresenter> {
    const user = await this.addUserUseCase.execute(body);
    return new UserPresenter(user);
  }
}
