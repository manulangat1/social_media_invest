import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './app-config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { connectionSource } from '../ormconfig';

import { AuthModule } from './auth/auth.module';
import { connectionSource } from '../ormconfig';
import { LoginCounterModule } from './login-counter/login-counter.module';
import { LogginModule } from './loggin/loggin.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { DonationsModule } from './donations/donations.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './common/filters/all.exception.filters';
import { AdminModule } from './admin/admin.module';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
  imports: [
    TypeOrmModule.forRoot(connectionSource),
    AppConfigModule,
    AuthModule,
    LoginCounterModule,
    LogginModule,
    PostsModule,
    CommentsModule,
    DonationsModule,
    AdminModule,
  ],
})
export class AppModule {}
