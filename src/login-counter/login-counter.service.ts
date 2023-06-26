import { Global, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginCounter } from '../db/entities/LoginCounter.Entity';
import { Repository } from 'typeorm';
import { LoginCounterDTO } from './dto/login.counter.dto';
import { User } from '../db/entities/User.Entity';
import { AppConfigService } from '../app-config/app-config.service';

@Global()
@Injectable()
export class LoginCounterService {
  private lockedOutPeriod = null;
  constructor(
    @InjectRepository(LoginCounter)
    private loginCounterRepository: Repository<LoginCounter>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: AppConfigService,
  ) {
    this.lockedOutPeriod = this.configService.lockedOutPeriod;
  }

  async create(data: LoginCounterDTO) {
    const newCounter = await this.loginCounterRepository.create({
      locked: false,
      ...data,
    });
    await this.loginCounterRepository.save(newCounter);
    return newCounter;
  }

  async checkIfLocked(userId: number) {
    console.log(userId, 'my login counter');
    return await this.loginCounterRepository.findOne({
      where: {
        user: { id: userId },
      },
    });
  }

  async updateCounterNumber(counter: LoginCounter) {
    if (counter.failedLoginAttempts === 5) {
      counter.lockedAt = new Date();
      counter.locked = true;
    }
    return await this.loginCounterRepository.save(counter);
  }
}
