import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  WEATHER_API_INJECTOR,
  WeatherApiService,
  WeatherViewLogEntity,
} from './infrastructure';
import { WeatherController, WeatherService } from './application';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import weatherApiConfig from "./weather-api.config";

@Module({
  imports: [
    TypeOrmModule.forFeature([WeatherViewLogEntity]),
    ConfigModule.forFeature(weatherApiConfig),
    HttpModule,
  ],
  providers: [
    WeatherService,
    {
      provide: WEATHER_API_INJECTOR,
      useClass: WeatherApiService,
    },
  ],
  exports: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
