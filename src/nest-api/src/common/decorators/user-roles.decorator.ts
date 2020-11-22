import { SetMetadata } from '@nestjs/common';

import {
  UserRoleEnum,
  UserRoleMetadataEnum,
} from './../models/user-roles.enum';

export const UserRoles = (...roles: UserRoleEnum[]) => SetMetadata(UserRoleMetadataEnum.USER_ROLE, roles);
