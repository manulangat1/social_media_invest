import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login.user.dto';
import { CreateUserDTO } from './dto/create.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('token')
  async login(@Body() dto: LoginUserDTO) {
    return await this.authService.login(dto);
  }

  @Post()
  async create(@Body() dto: CreateUserDTO) {
    console.log(dto);
    return await this.authService.create(dto);
  }
}
