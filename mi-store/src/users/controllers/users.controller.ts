import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './../service/users.service';
import { CreateUserDto } from '../dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getData() {
    return this.usersService.getAll();
  }

  @Post()
  addUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
