import { Entity, UniqueEntityID } from '../../../shared';
import { Fio } from './Fio';
import { ApiToken } from './ApiToken';
import { Login } from './Login';
import { Password } from './Password';

export interface IUserProps {
  fio: Fio;
  apiToken: ApiToken;
  login: Login;
  password: Password;
}

export class User extends Entity<IUserProps> {
  get fio(): Fio {
    return this.props.fio;
  }

  get apiToken(): ApiToken {
    return this.props.apiToken;
  }

  get login(): Login {
    return this.props.login;
  }

  get password(): Password {
    return this.props.password;
  }

  private constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: IUserProps, id?: UniqueEntityID): User {
    const { fio, apiToken, password, login } = props;
    return new User({ fio, apiToken, password, login }, id);
  }
}
