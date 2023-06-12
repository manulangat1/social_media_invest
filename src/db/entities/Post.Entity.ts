import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.Entity';
import { Comment } from './Comments.Entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  @Generated('uuid')
  pkid: string;

  @Column()
  title: string;

  @Column()
  detail: string;

  @Column({ nullable: true })
  homeImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // many to one relationship to a  user instance
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  owner: User;

  //One to many relationship to the comments entity
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
