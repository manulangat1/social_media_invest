import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentDTO } from './dto';

@Global()
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<EnvironmentDTO>) {}

  get BackendUrl() {
    console.log(this.configService.getOrThrow('env'));
    return process.env.DB_URL;
  }
  get CurrentEnvironment() {
    return this.configService.getOrThrow('env');
  }
  get lockedOutPeriod() {
    return this.configService.getOrThrow('lockedOutPeriod');
  }
}
