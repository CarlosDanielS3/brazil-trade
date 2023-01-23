import { CryptoHelper } from '@/infrastructure/common/helper/crypto.helper';
import { FindUserUseCase } from '@/domain/usecases/user/find-user.usecase';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private findUserUseCase: FindUserUseCase,
    private jwtService: JwtService,
    private readonly cryptoHelper: CryptoHelper,
  ) {}

  async login(login: LoginDto) {
    const user = await this.findUserUseCase.findByEmail(login.email);
    if (
      user &&
      (await this.cryptoHelper.compare(login.password, user.password))
    ) {
      const payload = { username: user.name, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new BadRequestException('Invalid credentials');
  }
}
