import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  ParseUUIDPipe,
} from "@nestjs/common";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import {
  CreateUserDTO,
  UpdateUserDTO,
  LoginUserDTO,
} from './../models/user.interface';

import {
  UserService,
} from './../service/user.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @Post()
  create(
    @Body() user: CreateUserDTO
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
    @Param('userId', ParseUUIDPipe)
    userId: string
  ) {
    return this.userService.findById(userId);
  }

  @Delete(':userId')
  delete(
    @Param('userId', ParseUUIDPipe)
    userId: string
  ) {
    return this.userService.delete(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId', ParseUUIDPipe)
    userId: string,
    @Body() user: UpdateUserDTO
  ) {
    return this.userService.update(userId, user);
  }

  @Post('login')
  login(
    @Body() user: LoginUserDTO
  ) {
    return this.userService.login(user)
      .pipe(
        map((jwt: string) => {
          return {
            accessToken: jwt
          }
        }),
      );
  }
}