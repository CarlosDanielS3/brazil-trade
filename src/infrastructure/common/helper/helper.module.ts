import { Module } from '@nestjs/common';
import { CryptoHelper } from './crypto.helper';

@Module({
  imports: [],
  exports: [CryptoHelper],
  providers: [CryptoHelper],
})
export class HelpersModule {}
