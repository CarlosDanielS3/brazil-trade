import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserUseCase } from '@/domain/usecases/user.usecase';
import { AddUserDto, UpdateUserDto } from './user.dto';
import { UserPresenter } from './user.presenter';
import { Public } from '@/main/decorators/public.decorator';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}
  @Post()
  @Public()
  async create(@Body() body: AddUserDto): Promise<UserPresenter> {
    const user = await this.userUseCase.create(body);
    return new UserPresenter(user);
  }

  @Put('/:id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    return await this.userUseCase.update(Number(id), body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userUseCase.delete(Number(id));
  }
}
