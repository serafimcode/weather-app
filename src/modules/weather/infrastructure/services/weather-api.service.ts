import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { GetWeatherRequestDto, GetWeatherResponseDto } from '../../application';

export const WEATHER_API_INJECTOR = 'WEATHER_API_INJECTOR';

export interface IWeatherApiService {
  getApiToken(): string;

  isTokenValid(token: string): boolean;

  getWeather(dto: GetWeatherRequestDto): Promise<GetWeatherResponseDto>;
}

@Injectable()
export class WeatherApiService implements IWeatherApiService {
  private readonly API_URL: string;

  constructor(
    private config: ConfigService,
    private httpService: HttpService,
  ) {
    this.API_URL = this.config.get<string>('weatherApi.apiUrl');
  }

  getApiToken(): string {
    return this.config.get<string>('weatherApi.apiToken');
  }

  isTokenValid(token: string): boolean {
    return token === this.getApiToken();
  }

  async getWeather(dto: GetWeatherRequestDto): Promise<GetWeatherResponseDto> {
    return await this.httpService.axiosRef
      .get(
        `${this.API_URL}?key=${dto.apiToken}&q=${dto.city}&lang=${dto.language}`,
      )
      .then((res) => res.data);
  }
}
