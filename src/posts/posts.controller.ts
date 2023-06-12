import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from '../db/entities/Post.Entity';
import { CurrentUser } from '../common/decorators';
import { User } from '../db/entities/User.Entity';
import { Public } from '../common/decorators/public.decorator';
import { CreatePostDTO } from './dto/create.post.dto';
import { GetPostDTO } from './dto/get.posts.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { BaseCommentDTO } from '../comments/dto';
import { CommentsService } from '../comments/comments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadToDisk } from '../common/utils/upload.disk';

// @ApiProperty('products')
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private postService: PostsService,
    private commentService: CommentsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  //   @Public()
  async get(@CurrentUser() user: User): Promise<GetPostDTO[]> {
    console.log(user);
    return this.postService.get();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('homeImage'))
  async create(
    @CurrentUser() user: User,
    @Body() dto: CreatePostDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PostEntity[]> {
    const newFile = await uploadToDisk(file);
    const f = newFile['uniqueName'];

    const data = {
      owner: user,
      homeImage: f,
      f,
      ...dto,
    };

    return this.postService.create(data);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(
    // @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<GetPostDTO> {
    return this.postService.getById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: any,
  ) {
    return this.postService.update(id, user, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string, @CurrentUser() user: User) {
    return this.postService.delete(id, user);
  }

  @Post(':id/comments')
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Param('id') id: string, @Body() dto: BaseCommentDTO) {
    const post = await this.postService.getByIdPlain(id);

    const data = {
      post: post,
      ...dto,
    };
    return this.commentService.create(data);
  }
}
