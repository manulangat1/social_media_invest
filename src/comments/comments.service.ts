import { Global, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../db/entities/Comments.Entity';
import { Repository } from 'typeorm';

@Injectable()
@Global()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}
  async getAllByPostId() {
    return;
  }
  async get(id: string): Promise<Comment> {
    return await this.commentRepository.findOne({
      where: {
        pkid: id,
      },
    });
  }
  async create(data: any) {
    console.log(data, 'my data');
    const newComment = await this.commentRepository.create(data);
    await this.commentRepository.save(newComment);
    return newComment;
  }
  async update() {
    return;
  }
  async delete() {
    return;
  }
}
