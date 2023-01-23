import { HelpersModule } from '@/infrastructure/common/helper/helper.module';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { LoginDto } from '@/presentation/auth/auth.dto';
import { AuthService } from '@/presentation/auth/auth.service';
import { JwtStrategy } from '@/presentation/auth/jwt.strategy';
import { UserModule } from '@/presentation/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../../src/presentation/auth/auth.controller';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        UserModule,
        PassportModule,
        RepositoriesModule,
        HelpersModule,
        JwtModule,
      ],
      providers: [AuthService, JwtStrategy],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  const mockRequest = (): LoginDto => ({
    email: 'emailmock@gmail.com',
    password: 'passwordmock',
  });
});
type SutTypes = {
  sut: AuthController;
};
// const makeSut = (): SutTypes => {
//   const authServiceSpy = new AuthServiceSpy();
//   const sut = new AuthController();
//   return {
//     sut,
//     authServiceSpy,
//   };
// };

describe('AddSurvey AuthController', () => {
  // test('Should call Validation with correct values', async () => {
  //   // const { sut, validationSpy } = makeSut();
  //   // const request = mockRequest();
  //   // await sut.handle(request);
  //   // expect(validationSpy.input).toEqual(request);
  // });
  // test('Should return 400 if Validation fails', async () => {
  //   const { sut, validationSpy } = makeSut();
  //   validationSpy.error = new Error();
  //   const httpResponse = await sut.handle(mockRequest());
  //   expect(httpResponse).toEqual(badRequest(validationSpy.error));
  // });
  // test('Should call AddSurvey with correct values', async () => {
  //   const { sut, addSurveySpy } = makeSut();
  //   const request = mockRequest();
  //   await sut.handle(request);
  //   expect(addSurveySpy.params).toEqual({ ...request, date: new Date() });
  // });
  // test('Should return 500 if AddSurvey throws', async () => {
  //   const { sut, addSurveySpy } = makeSut();
  //   jest.spyOn(addSurveySpy, 'add').mockImplementationOnce(throwError);
  //   const httpResponse = await sut.handle(mockRequest());
  //   expect(httpResponse).toEqual(serverError(new Error()));
  // });
  // test('Should return 204 on success', async () => {
  //   const { sut } = makeSut();
  //   const httpResponse = await sut.handle(mockRequest());
  //   expect(httpResponse).toEqual(noContent());
  // });
});
