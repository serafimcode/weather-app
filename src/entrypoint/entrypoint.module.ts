import { Module } from '@nestjs/common';
import { AuthModule } from '../modules/auth/auth.module';
import { WeatherModule } from '../modules/weather/weather.module';

@Module({
  imports: [AuthModule, WeatherModule],
})
export class EntrypointModule {}
