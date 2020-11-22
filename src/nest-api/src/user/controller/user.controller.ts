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
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

import {
  CustomApiException,
} from './../../common/exceptions/custom-api-exception';
import {
  UserNotFoundException,
  InvalidCredentialException,
  EmailAlreadyExistsException,
  ValidationFailedException,
} from "./../../common/exceptions/exception-thrower";
import {
  UserRoles,
} from './../../common/decorators/user-roles.decorator';
import {
  UpdateResultDTO,
  DeleteResultDTO,
} from './../../common/dto/operation-result.dto';
import {
  UserRolesGuard,
} from './../../common/guards/user-roles.guard';
import {
  JwtAuthGuard,
} from './../../auth/guards/jwt-auth.guard';

import {
  UserEntity,
} from './../entities/user.entity';
import {
  UserRoleEnum,
} from './../types/user-role.enum';

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
    description: 'Success: Create user',
    type: UserEntity,
  })
  @CustomApiException(
    () => EmailAlreadyExistsException, {
      description: 'Error: Email Already Exists'
    }
  )
  @CustomApiException(
    () => ValidationFailedException, {
      description: 'Error: Bad Request'
    }
  )
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
    description: 'Success: Get User List',
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
    description: 'Success: Get User Detail',
    type: UserEntity
  })
  @CustomApiException(
    () => UserNotFoundException, {
      description: 'Error: Not Found'
    }
  )
  @CustomApiException(
    () => ValidationFailedException, {
      description: 'Error: Bad Request'
    }
  )
  find(
    @Param('userId', ParseUUIDPipe)
    userId: string
  ) {
    return this.userService.findOne(userId);
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
    description: 'Success: Update User Detail',
    type: UpdateResultDTO,
  })
  @CustomApiException(
    () => UserNotFoundException, {
      description: 'Error: Not Found'
    }
  )
  @CustomApiException(
    () => ValidationFailedException, {
      description: 'Error: Bad Request'
    }
  )
  @UsePipes(new ValidationPipe({
    skipMissingProperties: true,
  }))
  @UserRoles(UserRoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, UserRolesGuard)
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
    description: 'Success: Login User',
    type: LoginUserResponseDTO,
  })
  @CustomApiException(
    () => InvalidCredentialException, {
      description: 'Error: Invalid Credentials'
    }
  )
  @CustomApiException(
    () => ValidationFailedException, {
      description: 'Error: Bad Request'
    }
  )
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
    description: 'Success: Delete User',
    type: DeleteResultDTO,
  })
  @CustomApiException(
    () => UserNotFoundException, {
      description: 'Error: Not Found'
    }
  )
  @CustomApiException(
    () => ValidationFailedException, {
      description: 'Error: Bad Request'
    }
  )
  @UserRoles(UserRoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, UserRolesGuard)
  delete(
    @Param('userId', ParseUUIDPipe)
    userId: string
  ) {
    return this.userService.delete(userId);
  }
}