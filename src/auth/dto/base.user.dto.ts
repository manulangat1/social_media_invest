import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class BaseUserDTO {
  @IsString()
  @Exclude()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  username: string;
}
