import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoginCounter } from './LoginCounter.Entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  @Generated('uuid')
  pkid: string;
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true, nullable: false })
  password: string;

  @OneToOne(
    () => LoginCounter,
    (loginCounter) => loginCounter.user,
    // {
    // cascade: true,
    // }
  )
  loginCounter: LoginCounter;

  @Column({ default: false })
  locked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
