import { Login } from './Login';
import { User } from './User';

export interface IUserRepository {
  getByLogin(login: Login): Promise<User>;

  exists(login: Login): Promise<boolean>;

  create(user: User): Promise<void>;
}
