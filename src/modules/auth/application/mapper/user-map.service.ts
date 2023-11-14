import { Mapper, UniqueEntityID } from '../../../../shared';
import { ApiToken, Fio, Login, Password, User } from '../../domain';
import { SignUpRequestDTO, SignUpResponseDTO } from '../dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../infrastructure';

@Injectable()
export class UserMapService
  implements Mapper<User, SignUpRequestDTO, SignUpResponseDTO, UserEntity>
{
  toDomain(e: UserEntity): User {
    try {
      const fio = Fio.create(e.fio);
      const apiToken = ApiToken.create(e.apiToken);
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
      apiToken: d.apiToken.value,
    };
  }

  toRequestDTO(d: User): SignUpRequestDTO {
    return {
      login: d.login.value,
      password: d.password.value,
      fio: d.fio.value,
    };
  }

  toResponseDTO(d: User): SignUpResponseDTO {
    return {
      fio: d.fio.value,
      apiToken: d.apiToken.value,
    };
  }
}
