import { Module } from '@nestjs/common';
import { AuthModule, WeatherModule } from '../modules';
import { TypeormAdapterModule } from '../shared';

@Module({
  imports: [AuthModule, WeatherModule, TypeormAdapterModule],
})
export class EntrypointModule {}
