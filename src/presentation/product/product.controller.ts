import { ProductUseCase } from '@/domain/usecases/product.usecase';
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
import { AddProductDto, UpdateProductDto } from './product.dto';
import { ProductPresenter } from './product.presenter';

@Controller('product')
@ApiTags('product')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPresenter)
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}
  @Post()
  async create(@Body() body: AddProductDto): Promise<ProductPresenter> {
    const product = await this.productUseCase.create(body);
    return new ProductPresenter(product);
  }

  @Put('/:id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): Promise<void> {
    return await this.productUseCase.update(Number(id), body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: string): Promise<void> {
    return await this.productUseCase.delete(Number(id));
  }
}
