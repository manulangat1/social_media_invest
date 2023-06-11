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
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from '../db/entities/Post.Entity';
import { CurrentUser } from '../common/decorators';
import { User } from '../db/entities/User.Entity';
import { Public } from '../common/decorators/public.decorator';
import { CreatePostDTO } from './dto/create.post.dto';
import { GetPostDTO } from './dto/get.posts.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

// @ApiProperty('products')
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  //   @Public()
  async get(@CurrentUser() user: User): Promise<GetPostDTO[]> {
    console.log(user);
    return this.postService.get();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: User,
    @Body() dto: CreatePostDTO,
  ): Promise<PostEntity[]> {
    const data = {
      owner: user,
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
}
