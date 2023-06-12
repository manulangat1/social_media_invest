import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './Post.Entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  //   @Column({ unique: true, nullable: false })
  @Generated('uuid')
  pkid: string;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // set up a many to one rlship to the post entity
  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn()
  post: Post;
}
