import { Public } from '@/main/decorators/public.decorator';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('auth/login')
  @Public()
  @ApiTags('auth')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }
}
