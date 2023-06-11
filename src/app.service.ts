import { Injectable } from '@nestjs/common';
import { AppConfigService } from './app-config/app-config.service';

@Injectable()
export class AppService {
  constructor(private appConfigService: AppConfigService) {}
  getHello(): string {
    // console.log(this.configService.getDbUrl());
    console.log(this.appConfigService.BackendUrl);
    return 'Hello World!';
  }
}
