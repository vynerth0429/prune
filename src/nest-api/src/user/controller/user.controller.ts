import { Controller, Body, Get, Post, Param, Delete, Patch } from "@nestjs/common";

import { TUserRequest } from './../models/user.interface';
import { UserService } from './../service/user.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @Post()
  create(
    @Body() user: TUserRequest
  ) {
    console.log(user);
    return this.userService.create(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  find(
    @Param('userId')
    userId: string
  ) {
    return this.userService.findById(userId);
  }

  @Delete(':userId')
  delete(
    @Param('userId')
    userId: string
  ) {
    return this.userService.delete(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() user: Partial<TUserRequest>
  ) {
    return this.userService.update(userId, user);
  }
}