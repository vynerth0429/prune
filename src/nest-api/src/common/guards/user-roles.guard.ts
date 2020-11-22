import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import {
  UserRoleEnum,
  UserRoleMetadataEnum,
} from './../models/user-roles.enum';

import {
  UserEntity,
} from './../../user/entities/user.entity';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: UserRoleEnum[] = this.reflector.get<UserRoleEnum[]>(UserRoleMetadataEnum.USER_ROLE, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;

    console.log('user', user);

    return true;
  }
}
