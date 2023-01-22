import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

const AddUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
  name: z.string().min(2).max(255),
});
ApiProperty({ type: AddUserDto });

export type AddUserDto = z.infer<typeof AddUserDto>;

const UpdateUserDto = z.object({
  name: z.string().min(2).max(255),
});
ApiProperty({ type: UpdateUserDto });

export type UpdateUserDto = z.infer<typeof UpdateUserDto>;
