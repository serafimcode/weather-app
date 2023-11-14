import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Login, User } from '../../domain';
import { Repository } from 'typeorm';
import { UserMapService } from '../mapper';
import { UserEntity } from '../../infrastructure';

export const USER_REPOSITORY_INJECTOR = 'USER_REPOSITORY_INJECTOR';

export interface IUserRepository {
  getByLogin(login: Login): Promise<User>;

  exists(login: Login): Promise<boolean>;

  save(user: User): Promise<void>;
}

@Injectable()
export class UserRepositoryService implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
    private userMap: UserMapService,
  ) {}

  async exists(login: Login): Promise<boolean> {
    return await this.userEntity.exist({ where: { login: login.value } });
  }

  async save(user: User): Promise<void> {
    const exists = await this.exists(user.login);

    if (!exists) {
      const rawUser = this.userMap.toPersistence(user);
      await this.userEntity.save(rawUser);
    } else {
      throw new Error('User with this login already exists');
    }
  }

  async getByLogin(login: Login): Promise<User> {
    try {
      const rawUser = await this.userEntity.findOne({
        where: { login: login.value },
      });
      return User.create(this.userMap.toDomain(rawUser));
    } catch (e) {
      throw new Error('User with this login does not exist');
    }
  }
}
