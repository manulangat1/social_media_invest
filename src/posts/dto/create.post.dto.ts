import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseUserDTO } from '../../auth/dto';
import { User } from '../../db/entities/User.Entity';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  detail: string;

  @IsString()
  @IsOptional()
  @Expose()
  homeImage: string;

  @IsOptional()
  owner: User | BaseUserDTO;
}
