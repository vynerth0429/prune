import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  UserRoleMetadataEnum,
} from '../models/metadata.enum';
import {
  InsufficientPermissionException,
} from '../exceptions/exception-thrower';

import {
  UserEntity,
} from './../../user/entities/user.entity';
import {
  UserRoleEnum,
} from './../../user/types/user-role.enum';
import {
  UserService,
} from './../../user/service/user.service';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private userService: UserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: UserRoleEnum[] = this.reflector.get<UserRoleEnum[]>(UserRoleMetadataEnum.USER_ROLE, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;

    return this.userService
      .findById(user.userId)
      .pipe(
        map((userEntity: UserEntity) => {
          if (roles.indexOf(userEntity.role) > -1) {
            return true;
          } else {
            throw new InsufficientPermissionException();
          }
        })
      );
  }
}
