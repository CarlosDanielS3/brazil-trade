import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  @ApiTags('auth')
  async login(@Body() body: { email: string; password: string }) {
    return await this.authService.login(body);
  }
}
