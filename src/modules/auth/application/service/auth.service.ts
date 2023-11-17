import { Inject, Injectable } from "@nestjs/common";
import { SignInRequestDto, SignUpRequestDTO } from "../dto";
import { Fio, ISessionRepository, IUserRepository, Login, Password, User } from "../../domain";

import { SESSION_REPOSITORY_INJECTOR, USER_REPOSITORY_INJECTOR } from "../repository";

import { IPasswordHashService, PASSWORD_HASH_INJECTOR } from "../../infrastructure";
import { UniqueEntityID } from "../../../../shared";
import { WeatherService } from "../../../weather/application";

/**TODO split by useCases*/
/**TODO: replace direct communication with DomainEvents*/
@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY_INJECTOR)
    private userRepo: IUserRepository,
    @Inject(PASSWORD_HASH_INJECTOR)
    private hashService: IPasswordHashService,
    @Inject(SESSION_REPOSITORY_INJECTOR)
    private sessionRepo: ISessionRepository,
    private weatherService: WeatherService,
  ) {}

  async signUp(dto: SignUpRequestDTO): Promise<User> {
    try {
      const fio = Fio.create(dto.fio);
      const login = Login.create(dto.login);

      if (Password.isValid(dto.password)) {
        const hashedPassword = await this.hashService.hashPassword(
          dto.password,
        );

        const password = Password.create(hashedPassword);
        const apiToken = this.weatherService.getApiToken();

        const user = User.create(
          { login, password, fio, apiToken },
          new UniqueEntityID(),
        );
        await this.userRepo.create(user);
        user.sessionId = await this.sessionRepo.create(user.id);

        return user;
      }
    } catch (e) {
      throw e;
    }
  }

  async signIn(dto: SignInRequestDto): Promise<User> {
    try {
      const login = Login.create(dto.login);
      const user = await this.userRepo.getByLogin(login);

      return user;
    } catch (e) {
      throw e;
    }
  }

  async validateUser(login: string, pass: string): Promise<boolean> {
    try {
      const userLogin = Login.create(login);
      const user = await this.userRepo.getByLogin(userLogin);

      const isPasswordCorrect = await this.hashService.comparePassword(
        pass,
        user.password.value,
      );
      if (isPasswordCorrect) {
        return true;
      } else throw new Error('Wrong password');
    } catch (e) {
      throw e;
    }
  }
}
