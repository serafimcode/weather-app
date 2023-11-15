import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('weatherApi', () => ({
  apiToken: process.env.WEATHER_API_TOKEN || 'd1086ddbacdb44b9b37100122231011',
  apiUrl:
    process.env.WEATHER_API_URL || 'http://api.weatherapi.com/v1/current.json',
}));
