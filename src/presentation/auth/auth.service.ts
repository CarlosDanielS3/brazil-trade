import { CryptoHelper } from '@/infrastructure/common/helper/crypto.helper';
import { FindUserUseCase } from '@/domain/usecases/user/find-user.usecase';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private findUserUseCase: FindUserUseCase,
    private jwtService: JwtService,
    private readonly cryptoHelper: CryptoHelper,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findUserUseCase.findByEmail(username);
    if (user && (await this.cryptoHelper.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
