import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../db/entities/Post.Entity';
import { AuthService } from '../auth/auth.service';
import { CreatePostDTO } from './dto/create.post.dto';
import { GetPostDTO } from './dto/get.posts.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { User } from '../db/entities/User.Entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private authService: AuthService,
  ) {}

  async create(data: any): Promise<Post[]> {
    const newPost = this.postRepository.create({
      ...data,
      homeImage: data.f,
      owner: data.owner,
    });
    console.log(data.owner, 'my owner');
    return await this.postRepository.save(newPost);
  }
  async get(): Promise<GetPostDTO[]> {
    const posts = await this.postRepository.find({
      where: {},
      order: {
        createdAt: 'DESC',
      },
    });
    return plainToInstance(GetPostDTO, posts);
  }
  async getById(id: string): Promise<GetPostDTO> {
    const post = await this.postRepository.findOne({
      where: {
        pkid: id,
      },
      relations: ['comments', 'donations'],
    });
    return plainToInstance(GetPostDTO, post);
    // return post;
  }

  async getByIdPlain(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: {
        pkid: id,
      },
      // relations: ['comments'],
    });
    // return plainToInstance(GetPostDTO, post);
    return post;
  }

  async update(id: string, user: User, data: any): Promise<GetPostDTO> {
    console.log(user);
    const post = await this.postRepository.findOne({
      where: {
        pkid: id,
        owner: { id: user.id },
      },
    });
    console.log(post, 'post instance');
    if (!post) {
      throw new NotFoundException('Post now found');
    }
    const updatedPost = {
      ...post,
      ...data,
    };

    return await this.postRepository.save(updatedPost);
  }

  async delete(id: string, user: User): Promise<string> {
    const post = await this.postRepository.findOne({
      where: {
        pkid: id,
        owner: { id: user.id },
      },
    });
    if (!post) {
      throw new NotFoundException('Post not Found');
    }
    await this.postRepository.delete(post);
    return 'Deletion success';
  }
}
