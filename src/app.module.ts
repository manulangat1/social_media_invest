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

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(connectionSource),
    AppConfigModule,
    AuthModule,
    LoginCounterModule,
    LogginModule,
  ],
})
export class AppModule {}
