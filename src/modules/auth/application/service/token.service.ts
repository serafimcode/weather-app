import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

export const TOKEN_INJECTOR = 'TOKEN_INJECTOR';

export interface ITokenService {
  generateApiToken(): string;
}

@Injectable()
export class TokenService implements ITokenService {
  generateApiToken(): string {
    return randomBytes(16).toString('base64');
  }
}
