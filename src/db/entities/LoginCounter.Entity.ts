import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.Entity';

@Entity()
export class LoginCounter {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  pkid: string;

  @Column({ default: false })
  locked: boolean;

  @CreateDateColumn({
    name: 'lockedAt',
    nullable: true,
  })
  lockedAt: Date;

  @Column({ default: 0 })
  failedLoginAttempts: number;

  @OneToOne(() => User, (user) => user.loginCounter, { cascade: true })
  @JoinColumn()
  user: User;
}
