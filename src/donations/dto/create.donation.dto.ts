import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Post } from '../../db/entities/Post.Entity';

export class CreateDonationDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  amount: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  comments: string;

  @IsOptional()
  @Expose()
  post: any;
}
