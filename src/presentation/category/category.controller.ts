import { CategoryUseCase } from '@/domain/usecases/category.usecase';
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
import { AddCategoryDto, UpdateCategoryDto } from './category.dto';
import { CategoryPresenter } from './category.presenter';

@Controller('category')
@ApiTags('category')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CategoryPresenter)
export class CategoryController {
  constructor(private readonly categoryUseCase: CategoryUseCase) {}
  @Post()
  async create(@Body() body: AddCategoryDto): Promise<CategoryPresenter> {
    const category = await this.categoryUseCase.create(body);
    return new CategoryPresenter(category);
  }

  @Put('/:id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
  ): Promise<void> {
    return await this.categoryUseCase.update(Number(id), body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteCategory(@Param('id') id: string): Promise<void> {
    return await this.categoryUseCase.delete(Number(id));
  }
}
