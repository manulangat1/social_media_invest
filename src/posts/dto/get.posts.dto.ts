import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { BaseCommentDTO } from '../../comments/dto';

export class GetPostDTO {
  @IsString()
  @Exclude()
  id: string;

  @IsString()
  @Expose()
  pkid: string;

  @IsString()
  @Expose()
  title: string;

  @IsString()
  @Expose()
  detail: string;

  @IsString()
  @Expose()
  homeImage: string;

  @Exclude()
  @IsDate()
  createdAt: string;
  @Exclude()
  @IsDate()
  updatedAt: string;

  @Expose()
  comments: BaseCommentDTO[];
}
