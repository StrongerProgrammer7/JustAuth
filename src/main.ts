import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() 
{
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT_S || 4000;
  app.use(cookieParser());
  await app.listen(PORT,async () =>
  {
    console.log(`Server has been started on the PORT=${PORT}`);
  });
}
bootstrap();
