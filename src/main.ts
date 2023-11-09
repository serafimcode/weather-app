import { NestFactory } from '@nestjs/core';
import { EntrypointModule } from './entrypoint/entrypoint.module';

async function bootstrap() {
  const app = await NestFactory.create(EntrypointModule);
  const globalPrefix = '/api/v1';
  app.setGlobalPrefix(globalPrefix);
  await app.listen(3000);
}

bootstrap();
