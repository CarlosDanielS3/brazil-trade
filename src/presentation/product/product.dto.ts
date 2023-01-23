import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const AddProductSchema = z.object({
  title: z.string().min(2).max(20),
  price: z.number().min(1),
  description: z.string().min(2).max(255),
  category_id: z.number().min(1),
});

export class AddProductDto extends createZodDto(AddProductSchema) {}

const UpdateProductSchema = z.object({
  title: z.string().min(2).max(20).optional(),
  price: z.number().min(1).optional(),
  description: z.string().min(2).max(255).optional(),
  category_id: z.number().min(1).optional(),
});

export class UpdateProductDto extends createZodDto(UpdateProductSchema) {}
