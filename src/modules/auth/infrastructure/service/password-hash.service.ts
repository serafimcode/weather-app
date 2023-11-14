import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

export const PASSWORD_HASH_INJECTOR = 'PASSWORD_HASH_INJECTOR';

export interface IPasswordHashService {
  hashPassword(password: string): Promise<string>;

  comparePassword(password: string, hash: string): Promise<boolean>;
}

@Injectable()
export class PasswordHashService implements IPasswordHashService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return hash(password, saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
