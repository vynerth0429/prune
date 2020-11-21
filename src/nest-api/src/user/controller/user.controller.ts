import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

import {
  TErrorResponse,
  TErrorContent,
} from './../../common/models/error-codes.types';
import {
  UpdateResultDTO,
  DeleteResultDTO,
} from './../../common/dto/operation-result.dto';

import {
  UserEntity,
} from '../entities/user.entity';

import {
  CreateUserDTO,
  UpdateUserDTO,
  LoginUserDTO,
  LoginUserResponseDTO,
} from './../dto/user.dto';

import {
  UserService,
} from './../service/user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  /**
   * @description Register user
   * @param user
   */
  @Post()
  @ApiOperation({
    summary: 'Register new user'
  })
  @ApiBody({
    type: CreateUserDTO
  })
  @ApiResponse({
    status: 201,
    description: 'Create user success',
    type: UserEntity,
  })
  create(
    @Body() user: CreateUserDTO
  ) {
    return this.userService.create(user);
  }


  /**
   * @description Get list of users
   */
  @Get()
  @ApiOperation({
    summary: 'Get list all users'
  })
  @ApiResponse({
    status: 200,
    description: 'Get user list success',
    type: UserEntity,
    isArray: true,
  })
  findAll() {
    return this.userService.findAll();
  }


  /**
   * @description Find user by userId
   * @param userId
   */
  @Get(':userId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get single user',
  })
  @ApiResponse({
    status: 200,
    description: 'Get user detail success',
    type: UserEntity
  })
  find(
    @Param('userId', ParseUUIDPipe)
    userId: string
  ) {
    return this.userService.findById(userId);
  }


  /**
   * @description Update user detail
   * @param userId
   * @param user
   */
  @Patch(':userId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user detail'
  })
  @ApiResponse({
    status: 200,
    description: 'Update user detail success',
    type: UpdateResultDTO,
  })
  @UsePipes(new ValidationPipe({
    skipMissingProperties: true,
  }))
  update(
    @Param('userId', ParseUUIDPipe)
    userId: string,
    @Body() user: UpdateUserDTO
  ) {
    return this.userService.update(userId, user);
  }


  /**
   * @description Login user
   * @param user
   */
  @Post('login')
  @ApiOperation({
    summary: 'Login user'
  })
  @ApiResponse({
    status: 201,
    description: 'Login user success',
    type: LoginUserResponseDTO,
  })
  login(
    @Body() user: LoginUserDTO
  ) {
    return this.userService.login(user);
  }


  /**
   * @description Delete single user
   * @param userId
   */
  @Delete(':userId')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete single user'
  })
  @ApiResponse({
    status: 200,
    description: 'Delete user success',
    type: DeleteResultDTO,
  })
  delete(
    @Param('userId', ParseUUIDPipe)
    userId: string
  ) {
    return this.userService.delete(userId);
  }
}