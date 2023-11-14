import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormPostgresConfig from './typeorm-postgres.config';
import { join } from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(typeormPostgresConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: config.get<'postgres'>('database.type'),
          host: config.get('database.host'),
          port: config.get('database.port'),
          username: config.get('database.username'),
          password: config.get('database.password'),
          database: config.get<string>('database.database'),
          synchronize: true,
          entities: [
            join(
              __dirname,
              '../../../modules/**/infrastructure/entities/*.entity{.ts,.js}',
            ),
          ],
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class TypeormAdapterModule {}
