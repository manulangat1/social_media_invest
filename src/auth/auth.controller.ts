import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login.user.dto';
import { CreateUserDTO } from './dto/create.user.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('token')
  async login(@Body() dto: LoginUserDTO) {
    return await this.authService.login(dto);
  }

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDTO) {
    console.log(dto);
    return await this.authService.create(dto);
  }
}
