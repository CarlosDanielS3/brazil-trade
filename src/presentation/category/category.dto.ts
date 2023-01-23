import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const AddCategorySchema = z.object({
  name: z.string().min(2).max(20),
  father_id: z.number().optional(),
});

export class AddCategoryDto extends createZodDto(AddCategorySchema) {}

const UpdateCategorySchema = z.object({
  name: z.string().min(2).max(20),
  father_id: z.number().optional(),
});

export class UpdateCategoryDto extends createZodDto(UpdateCategorySchema) {}
