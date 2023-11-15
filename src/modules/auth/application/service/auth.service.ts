import { Inject, Injectable } from '@nestjs/common';
import {
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDTO,
  SignUpResponseDTO,
} from '../dto';
import { Fio, Login, Password, User } from '../../domain';

import { IUserRepository, USER_REPOSITORY_INJECTOR } from '../repository';
import {
  IPasswordHashService,
  PASSWORD_HASH_INJECTOR,
} from '../../infrastructure';
import { UniqueEntityID } from '../../../../shared';
import { WeatherService } from '../../../weather/application';
import { UserMapService } from '../mapper';

/**TODO split by useCases*/
@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY_INJECTOR)
    private userRepo: IUserRepository,
    @Inject(PASSWORD_HASH_INJECTOR)
    private hashService: IPasswordHashService,
    private weatherService: WeatherService,
    private userMap: UserMapService,
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

        /**TODO: replace direct communication with DomainEvents*/
        const apiToken = this.weatherService.getApiToken();

        const user = User.create(
          { login, password, fio, apiToken },
          new UniqueEntityID(),
        );

        await this.userRepo.save(user);

        return this.userMap.toSignUpResponseDTO(user);
      }
    } catch (e) {
      throw e;
    }
  }

  async signIn(dto: SignInRequestDto): Promise<SignInResponseDto> {
    try {
      const login = Login.create(dto.login);
      const user = await this.userRepo.getByLogin(login);

      const isPasswordCorrect = await this.hashService.comparePassword(
        dto.password,
        user.password.value,
      );

      if (isPasswordCorrect) {
        return this.userMap.toSignInResponseDTO(user);
      } else throw new Error('Wrong password');
    } catch (e) {
      throw e;
    }
  }
}
