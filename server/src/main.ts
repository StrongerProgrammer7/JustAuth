import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { errorMiddleware } from './middleware/error.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() 
{
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT_S || 4000;
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.use(errorMiddleware);
  await app.listen(PORT,async () =>
  {
    console.log(`Server has been started on the PORT=${PORT}`);
  });
}
bootstrap();
