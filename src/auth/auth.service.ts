import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { AppConfigService } from '../app-config/app-config.service';
import { LoginUserDTO } from './dto/login.user.dto';
import { CreateUserDTO } from './dto/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../db/entities/User.Entity';
import { Repository } from 'typeorm';
// import argon2 from 'argon2';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { BaseUserDTO } from './dto';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { LoginResponseDTO } from './dto/login.response.dto';
import { LoginCounterService } from '../login-counter/login-counter.service';
import { getTime } from '../common/utils/getTime';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: AppConfigService,
    private jwtService: JwtService,
    private loginCounterService: LoginCounterService,
  ) {}

  async login(dto: LoginUserDTO): Promise<LoginResponseDTO> {
    const user = await this.getUserByEmail(dto.email);

    if (!user) {
      throw new BadRequestException('Credentials incorrect');
    }

    const passwordsMatch = await argon2.verify(user.password, dto.password);

    const lockedUser = await this.loginCounterService.checkIfLocked(user.id);

    console.log(lockedUser, 'my locked user', user.loginCounter, 'here');
    if (user.loginCounter.locked) {
      const minutes = getTime(user.loginCounter.lockedAt);
      if (minutes > 5) {
        lockedUser.locked = false;
        lockedUser.lockedAt = null;
        lockedUser.failedLoginAttempts = 0;
        await this.loginCounterService.updateCounterNumber(lockedUser);
      } else {
        throw new BadRequestException(
          `Account locked.Try logging in after ${5} minutes!`,
        );
      }
    }
    if (!passwordsMatch) {
      const data = {
        user: user,
        failedLoginAttempts: 1,
      };
      if (!lockedUser) {
        await this.loginCounterService.create(data);
      }
      lockedUser.failedLoginAttempts += 1;
      await this.loginCounterService.updateCounterNumber(lockedUser);
      throw new BadRequestException('Credentials are incorrect');
    }
    // generate jwt
    const payload = { user };

    const token = await this.jwtService.signAsync(payload);

    const data = {
      user_data: plainToClass(BaseUserDTO, user),
      token,
      message: 'LOGIN SUCCESS',
    };

    lockedUser.failedLoginAttempts = 0;
    lockedUser.lockedAt = null;
    lockedUser.locked = false;
    await this.loginCounterService.updateCounterNumber(lockedUser);
    return data;
  }
  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: ['loginCounter'],
    });
  }

  async create(dto: CreateUserDTO): Promise<BaseUserDTO> {
    const { password, ...otherDTO } = dto;

    const userExists = await this.getUserByEmail(otherDTO.email);

    if (userExists) {
      throw new BadRequestException('Account already exists in our systems');
    }

    const hash = await argon2.hash(password);

    const user = await this.userRepository.create({
      password: hash,
      ...otherDTO,
    });
    await this.userRepository.save(user);
    // send an email using sendgrid
    return plainToClass(BaseUserDTO, user);
  }

  // implement locking user behaviour
  // async lockUser() {

  // }
}
