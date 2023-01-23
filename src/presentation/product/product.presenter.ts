import { Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category_id: number;

  constructor(category: Product) {
    this.id = category.id;
    this.title = category.title;
    this.price = category.price;
    this.description = category.description;
    this.category_id = category.category_id;
  }
}
