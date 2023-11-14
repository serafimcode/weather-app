import { Module } from '@nestjs/common';
import {
  AuthController,
  AuthService,
  TOKEN_INJECTOR,
  TokenService,
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

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
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
    {
      provide: TOKEN_INJECTOR,
      useClass: TokenService,
    },
    UserMapService,
  ],
})
export class AuthModule {}
