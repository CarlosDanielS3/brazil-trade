import { Category } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  father_id: number | null;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.father_id = category.father_id;
  }
}
