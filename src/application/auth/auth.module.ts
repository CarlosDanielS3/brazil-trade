import { CryptoHelper } from '@/infrastructure/common/helper/crypto.helper';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    RepositoriesModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, CryptoHelper, JwtStrategy],
})
export class AuthModule {}
