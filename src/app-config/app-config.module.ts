import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
// import { AppConfigController } from './app-config.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AppConfigService, ConfigService],
  // controllers: [AppConfigController],
  exports: [AppConfigService],
})
export class AppConfigModule {}
