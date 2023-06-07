import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './app-config/app-config.module';

@Module({
  // imports: [ConfigModule, ConfigService],
  controllers: [AppController],
  providers: [AppService],
  imports: [AppConfigModule],
})
export class AppModule {}
