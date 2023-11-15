import { Inject, Injectable } from '@nestjs/common';
import { GetWeatherRequestDto, GetWeatherResponseDto } from '../dto';
import { IWeatherApiService, WEATHER_API_INJECTOR } from '../../infrastructure';

@Injectable()
export class WeatherService {
  constructor(
    @Inject(WEATHER_API_INJECTOR)
    private weatherApiService: IWeatherApiService,
  ) {}

  getApiToken(): string {
    return this.weatherApiService.getApiToken();
  }

  async getCurrentWeather(
    dto: GetWeatherRequestDto,
  ): Promise<GetWeatherResponseDto> {
    return await this.weatherApiService.getWeather(dto);
  }
}
