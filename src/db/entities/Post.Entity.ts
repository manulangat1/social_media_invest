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
import { User } from './User.Entity';

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
}
