import { Entity, UniqueEntityID } from '../../../../shared';
import { Fio } from './Fio';
import { Login } from './Login';
import { Password } from './Password';

export interface IUserProps {
  fio: Fio;
  apiToken: string;
  sessionId?: UniqueEntityID;
  login: Login;
  password: Password;
}

export class User extends Entity<IUserProps> {
  get fio(): Fio {
    return this.props.fio;
  }

  get apiToken(): string {
    return this.props.apiToken;
  }

  get login(): Login {
    return this.props.login;
  }

  get password(): Password {
    return this.props.password;
  }

  get sessionId(): UniqueEntityID {
    return this.props.sessionId;
  }

  set sessionId(id: UniqueEntityID) {
    this.props.sessionId = id;
  }

  private constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**TODO: get rid of create(), move validation to constructor*/
  static create(props: IUserProps, id?: UniqueEntityID): User {
    return new User(props, id);
  }
}
