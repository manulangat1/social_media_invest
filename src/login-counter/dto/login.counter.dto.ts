import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../db/entities/User.Entity';

export class LoginCounterDTO {
  @IsNotEmpty()
  user: User | any;
  @IsNotEmpty()
  @IsNumber()
  failedLoginAttempts: number;
}
