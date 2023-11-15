import { Body, Controller, Post } from '@nestjs/common';

import { WeatherService } from '../service';
import { GetWeatherRequestDto, GetWeatherResponseDto } from '../dto';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Post()
  async getWeather(
    @Body() body: GetWeatherRequestDto,
  ): Promise<GetWeatherResponseDto> {
    try {
      return await this.weatherService.getCurrentWeather(body);
    } catch (e) {
      throw e;
    }
  }
}
