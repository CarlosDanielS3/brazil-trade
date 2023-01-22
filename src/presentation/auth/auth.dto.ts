import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

const LoginDto = z.object({
  email: z.string().email(),
  password: z.string(),
});
ApiProperty({ type: LoginDto });

export type LoginDto = z.infer<typeof LoginDto>;
