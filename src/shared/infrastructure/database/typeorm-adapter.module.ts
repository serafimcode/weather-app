import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormPostgresConfig from './typeorm-postgres.config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forFeature(typeormPostgresConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get<'postgres'>('database.type'),
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get<string>('database.database'),
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
