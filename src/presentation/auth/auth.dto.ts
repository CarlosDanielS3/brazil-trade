import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const LoginSchema = extendApi(
  z.object({
    email: z.string().email(),
    password: z.string(),
  }),
);

export class LoginDto extends createZodDto(LoginSchema) {}
