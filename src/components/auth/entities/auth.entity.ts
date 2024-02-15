// TODO:: This entity must be stored with NOSQL database for faster access and better performance.

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('authentications')
@Unique(['email'])
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('user_id')
  userId: number;

  @Column({ name: 'facebook_id', nullable: true })
  facebookId: string;

  @Column({ name: 'google_id', nullable: true })
  googleId: string;

  @Column({ name: 'token', nullable: true })
  token: string;

  @Column({ name: 'ip_address', nullable: true })
  ipAddress: string;

  @Column({ name: 'user_agent', nullable: true })
  userAgent: string;

  @CreateDateColumn('created_at')
  createdAt: Date;

  @UpdateDateColumn('updated_at')
  updatedAt: Date;
}

export class AuthEntity {}
