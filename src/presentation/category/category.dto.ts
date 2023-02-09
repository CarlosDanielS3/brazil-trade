import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const AddCategorySchema = extendApi(
  z.object({
    name: z.string().min(2).max(20),
    father_id: z.number().optional(),
  }),
);

export class AddCategoryDto extends createZodDto(AddCategorySchema) {}

const UpdateCategorySchema = extendApi(
  z.object({
    name: z.string().min(2).max(20),
    father_id: z.number().optional(),
  }),
);

export class UpdateCategoryDto extends createZodDto(UpdateCategorySchema) {}
