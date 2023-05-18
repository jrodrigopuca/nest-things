import { Injectable } from '@nestjs/common';
import { User } from './../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  //inyectar un servicio de otro módulo
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  getAll() {
    return this.userRepository.find({});
  }
  create(user: CreateUserDto) {
    return this.userRepository.insert(user);
  }
}
