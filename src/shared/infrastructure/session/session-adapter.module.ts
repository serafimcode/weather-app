import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as session from 'express-session';
import * as pgSession from 'connect-pg-simple';
import { ConfigModule, ConfigService } from '@nestjs/config';
import sessionConfig from './session.config';
import * as pg from 'pg';

@Module({
  imports: [ConfigModule.forFeature(sessionConfig)],
})
export class SessionModule implements NestModule {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const sessionMiddleware = session({
      store: new (pgSession(session))({
        pool: new pg.Pool({
          host: this.configService.get('database.host'),
          port: this.configService.get('database.port'),
          user: this.configService.get('database.username'),
          password: this.configService.get('database.password'),
          database: this.configService.get<string>('database.database'),
        }),
      }),
      secret: this.configService.get('session.secret'),
      resave: this.configService.get('session.resave'),
      saveUninitialized: this.configService.get('session.saveUninitialized'),
      cookie: {
        secure: this.configService.get('session.cookieSecure'),
        maxAge: this.configService.get('session.cookieMaxAge'),
      },
    });

    consumer
      .apply(sessionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
