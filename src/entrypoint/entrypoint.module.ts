import { Module } from '@nestjs/common';
import { AuthModule, WeatherModule } from '../modules';
import { SessionModule, TypeormAdapterModule } from '../shared';

@Module({
  imports: [AuthModule, WeatherModule, TypeormAdapterModule, SessionModule],
})
export class EntrypointModule {}
