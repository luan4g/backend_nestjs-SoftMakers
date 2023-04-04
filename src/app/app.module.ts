import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from 'src/modules/auth/auth.module';
import { PostModule } from 'src/modules/post/post.module';
import { UserModule } from 'src/modules/user/user.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,
    JwtModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('posts')
  }
}
