import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { HelpersModule } from '@/infrastructure/common/helper/helper.module';
import { UserUseCase } from '@/domain/usecases/user.usecase';

@Module({
  imports: [
    PassportModule,
    RepositoriesModule,
    HelpersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserUseCase],
})
export class AuthModule {}
