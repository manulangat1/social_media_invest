import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { BaseCommentDTO } from './dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get(@Param() id: string) {
    return this.commentService.get(id);
  }
  //   @Post(':id/comments')
  //   async create(@Body() dto: BaseCommentDTO) {
  //     return this.commentService.create(dto);
  //   }
}
