import { Module } from '@nestjs/common';
import {
  AuthController,
  AuthService,
  USER_REPOSITORY_INJECTOR,
  UserMapService,
  UserRepositoryService,
} from './application';
import {
  PASSWORD_HASH_INJECTOR,
  PasswordHashService,
  UserEntity,
} from './infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherModule } from '../weather';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), WeatherModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: USER_REPOSITORY_INJECTOR,
      useClass: UserRepositoryService,
    },
    {
      provide: PASSWORD_HASH_INJECTOR,
      useClass: PasswordHashService,
    },
    UserMapService,
  ],
})
export class AuthModule {}
