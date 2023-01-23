import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserUseCase } from '@/domain/usecases/user/add-user.usecase';
import { DeleteUserUseCase } from '@/domain/usecases/user/delete-user.usecase';
import { UpdateUserUseCase } from '@/domain/usecases/user/update-user.usecase';
import { AddUserDto, UpdateUserDto } from './user.dto';
import { UserPresenter } from './user.presenter';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    private readonly addUserUseCase: AddUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}
  @Post()
  async createNewUser(@Body() body: AddUserDto): Promise<UserPresenter> {
    const user = await this.addUserUseCase.execute(body);
    return new UserPresenter(user);
  }

  @Put('/:id')
  @HttpCode(204)
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    return await this.updateUserUseCase.execute(Number(id), body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.deleteUserUseCase.execute(Number(id));
  }
}
