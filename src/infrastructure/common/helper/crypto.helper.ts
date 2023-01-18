import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { createDecipheriv } from 'crypto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoHelper {
  private readonly iv: Buffer = randomBytes(16);
  private readonly password: string = process.env.CRYPTO_PASSWORD;
  async encrypt(textToEncrypt: string) {
    const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, this.iv);

    return Buffer.concat([cipher.update(textToEncrypt), cipher.final()]);
  }
  async decrypt(encryptedText: Buffer) {
    const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, this.iv);
    return Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  }

  async hash(textToHash: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(textToHash, salt);
  }

  async compare(textToCompare: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(textToCompare, hash);
  }
}
