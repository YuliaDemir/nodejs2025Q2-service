import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';
import { ExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './logging/logging.interseptor';

configDotenv();

process.on('uncaughtException', (err) => {
  console.error('[uncaughtException]', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection]', reason);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggingService);

  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalFilters(new ExceptionsFilter(logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT || 4000, '0.0.0.0');
  logger.log(`Server: http://localhost:${process.env.PORT || 4000}`);
}
bootstrap();
