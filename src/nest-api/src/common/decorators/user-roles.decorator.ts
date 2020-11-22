import { SetMetadata } from '@nestjs/common';

import {
  UserRoleMetadataEnum,
} from '../models/metadata.enum';

import {
  UserRoleEnum,
} from './../../user/types/user-role.enum';

export const UserRoles = (...roles: UserRoleEnum[]) => SetMetadata(UserRoleMetadataEnum.USER_ROLE, roles);
