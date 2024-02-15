import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import UserEntity from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import process from 'process';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(userEntity: UserEntity): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(userEntity.password, 10);
    const newAuth = this.userRepository.create({
      ...userEntity,
      password: hashedPassword,
    });
    return this.userRepository.save(newAuth);
  }

  //Promise<UserEntity>
  async login(createAuthDto: CreateAuthDto): Promise<object> {
    const user = await this.userRepository.findOne({
      where: {
        email: createAuthDto.email,
      },
    });

    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        createAuthDto.password,
        user.password,
      );

      if (isPasswordMatching) {
        return {
          access_token: this.jwtService.sign(
            {
              username: user.email,
              sub: user.id,
            },
            {
              secret: this.configService.get<string>('JWT_SECRET'),
            },
          ),
        };
      }
    }
    return null;
  }
}
