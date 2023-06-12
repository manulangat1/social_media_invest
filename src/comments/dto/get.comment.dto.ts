import { IsNotEmpty, IsString } from 'class-validator';
import { BaseCommentDTO } from './create.comment.dto';
import { Exclude, Expose } from 'class-transformer';

export class GetCommentDTO extends BaseCommentDTO {
  @IsNotEmpty()
  @Expose()
  @IsString()
  pkid: string;

  @IsNotEmpty()
  @Exclude()
  @IsString()
  id: string;
}
