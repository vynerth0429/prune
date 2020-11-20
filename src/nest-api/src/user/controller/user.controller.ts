import { Controller, Body, Get, Post, Param, Delete, Patch } from "@nestjs/common";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";

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
    return this.userService.create(user)
      .pipe(
        catchError((error) => of(error.message))
      );
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
    @Body() user: TUserRequest
  ) {
    return this.userService.update(userId, user);
  }

  @Post('login')
  login(
    @Body() user: TUserRequest
  ) {
    return this.userService.login(user)
      .pipe(
        map((jwt: string) => {
          return {
            accessToken: jwt
          }
        }),
        catchError((error) => of(error.message))
      );
  }
}