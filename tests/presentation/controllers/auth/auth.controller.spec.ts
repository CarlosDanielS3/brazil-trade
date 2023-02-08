import { AuthController } from '@/presentation/auth/auth.controller';
import { AuthService } from '@/presentation/auth/auth.service';
import { Test } from '@nestjs/testing';
import { UserUseCase } from '@/domain/usecases/user.usecase';
import { User } from '@prisma/client';
import { CryptoHelper } from '@/infrastructure/common/helper/crypto.helper';
import { LoginDto } from '@/presentation/auth/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { DatabaseUserRepository } from '@/infrastructure/repositories/user.repository';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userUseCase: UserUseCase;
  let userRepository: DatabaseUserRepository;
  let prismaService: PrismaService;
  let cryptoHelper: CryptoHelper;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserUseCase,
        CryptoHelper,
        JwtService,
        DatabaseUserRepository,
        PrismaService,
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
    userUseCase = moduleRef.get<UserUseCase>(UserUseCase);
    userRepository = moduleRef.get<DatabaseUserRepository>(
      DatabaseUserRepository,
    );
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    cryptoHelper = moduleRef.get<CryptoHelper>(CryptoHelper);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('login', () => {
    const loginMock: LoginDto = {
      email: 'piep@kumok.gf',
      password: 'pass123',
    };
    const user: User = {
      id: 1,
      email: loginMock.email,
      name: 'Viola Armstrong',
      password: loginMock.password,
      created_at: new Date(),
      updated_at: new Date(),
    };
    it('should be able to login in the application', async () => {
      const hashedPass = await cryptoHelper.hash(loginMock.password);
      user.password = hashedPass;
      jest.spyOn(userUseCase, 'findByEmail').mockResolvedValueOnce(user);
      jest
        .spyOn(jwtService, 'sign')
        .mockImplementationOnce(() => 'access_token');

      expect(await authController.login(loginMock)).toStrictEqual({
        access_token: 'access_token',
      });
    });

    it('should throw error if login is wrong', async () => {
      jest.spyOn(userUseCase, 'findByEmail').mockResolvedValueOnce(user);
      jest
        .spyOn(jwtService, 'sign')
        .mockImplementationOnce(() => 'access_token');
      user.password = 'wrongPass';

      await expect(authController.login(loginMock)).rejects.toEqual(
        new BadRequestException('Invalid credentials'),
      );
    });
  });
});
