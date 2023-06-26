import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  email: string;
  @IsString()
  @IsNotEmpty()
  // @Exclude()
  password: string;
}
