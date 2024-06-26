import { MiddlewareConsumer,Module,NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UserController } from './user/user.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    UserModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }])],
})
export class AppModule implements NestModule 
{
  configure(consumer: MiddlewareConsumer)
  {
    consumer.apply(LoggerMiddleware)
      .forRoutes(UserController);

    consumer.apply(AuthMiddleware)
      .forRoutes('api/users');
  }
}
