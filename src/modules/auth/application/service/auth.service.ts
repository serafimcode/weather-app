import { Inject, Injectable } from '@nestjs/common';
import { SignUpRequestDTO, SignUpResponseDTO } from '../dto';
import { ApiToken, Fio, Login, Password, User } from '../../domain';
import { UniqueEntityID } from '../../../../shared';
import { IUserRepository, USER_REPOSITORY_INJECTOR } from '../repository';
import {
  IPasswordHashService,
  PASSWORD_HASH_INJECTOR,
} from '../../infrastructure';
import { ITokenService, TOKEN_INJECTOR } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY_INJECTOR)
    private userRepo: IUserRepository,
    @Inject(PASSWORD_HASH_INJECTOR)
    private hashService: IPasswordHashService,
    @Inject(TOKEN_INJECTOR)
    private tokenService: ITokenService,
  ) {}

  async signUp(dto: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    try {
      const fio = Fio.create(dto.fio);
      const login = Login.create(dto.login);

      if (Password.isValid(dto.password)) {
        const hashedPassword = await this.hashService.hashPassword(
          dto.password,
        );

        const password = Password.create(hashedPassword);
        const apiToken = ApiToken.create(this.tokenService.generateApiToken());

        const user = User.create(
          { login, password, fio, apiToken },
          new UniqueEntityID(),
        );

        await this.userRepo.save(user);

        return Promise.resolve({
          fio: user.fio.value,
          apiToken: user.apiToken.value,
        });
      }
    } catch (e) {
      throw e;
    }
  }
}
