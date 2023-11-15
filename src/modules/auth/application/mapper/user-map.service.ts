import { Mapper, UniqueEntityID } from '../../../../shared';
import { Fio, Login, Password, User } from '../../domain';
import { SignInResponseDto, SignUpResponseDTO } from '../dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../infrastructure';

@Injectable()
export class UserMapService implements Mapper<User, UserEntity> {
  toDomain(e: UserEntity): User {
    try {
      const fio = Fio.create(e.fio);
      const apiToken = e.apiToken;
      const password = Password.create(e.password);
      const login = Login.create(e.login);

      return User.create(
        {
          fio,
          apiToken,
          password,
          login,
        },
        new UniqueEntityID(),
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  toPersistence(d: User): UserEntity {
    return {
      id: d.id.value,
      fio: d.fio.value,
      login: d.login.value,
      password: d.password.value,
      apiToken: d.apiToken,
    };
  }

  toSignUpResponseDTO(d: User): SignUpResponseDTO {
    return {
      fio: d.fio.value,
      apiToken: d.apiToken,
    };
  }

  toSignInResponseDTO(d: User): SignInResponseDto {
    return {
      fio: d.fio.value,
      apiToken: d.apiToken,
    };
  }
}
