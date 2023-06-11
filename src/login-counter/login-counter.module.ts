import { Global, Module } from '@nestjs/common';
import { LoginCounterService } from './login-counter.service';
import { LoginCounterController } from './login-counter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginCounter } from '../db/entities/LoginCounter.Entity';
import { User } from '../db/entities/User.Entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LoginCounter, User])],
  providers: [LoginCounterService],
  controllers: [LoginCounterController],
  exports: [LoginCounterService],
})
export class LoginCounterModule {}
