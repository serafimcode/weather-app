import { Module } from '@nestjs/common';
import {
  AuthController,
  AuthService,
  SESSION_REPOSITORY_INJECTOR,
  SessionRepositoryService,
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
import { SessionEntity } from './infrastructure/entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SessionEntity]),
    WeatherModule,
  ],
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
      provide: SESSION_REPOSITORY_INJECTOR,
      useClass: SessionRepositoryService,
    },
    UserMapService,
  ],
})
export class AuthModule {}
