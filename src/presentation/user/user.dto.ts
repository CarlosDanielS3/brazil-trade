import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const AddUserSchema = extendApi(
  z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(255)
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        {
          message:
            'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        },
      ),
    name: z.string().min(2).max(255),
  }),
);

export class AddUserDto extends createZodDto(AddUserSchema) {}

const UpdateUserSchema = extendApi(
  z.object({
    name: z.string().min(2).max(255),
  }),
);

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
