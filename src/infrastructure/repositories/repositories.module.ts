import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [RepositoriesModule, PrismaModule],
  exports: [DatabaseUserRepository],
  providers: [DatabaseUserRepository],
})
export class RepositoriesModule {}
