import {
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";

import {
  TErrorContent,
  ErrorCodesEnum,
  TErrorCodesEnum,
} from './../models/error-codes.types';

const generateErrorContent = (code: TErrorCodesEnum): TErrorContent => {
  return {
    errorCode: code,
    errorDescription: ErrorCodesEnum[code]
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super(generateErrorContent('U_0001'));
  }
}

export class InvalidCredentialException extends UnauthorizedException {
  constructor() {
    super(generateErrorContent('U_0002'));
  }
}

export class EmailAlreadyExistsException extends ConflictException {
  constructor() {
    super(generateErrorContent('A_0002'));
  }
}

export class ValidationFailedException extends BadRequestException {
  constructor() {
    super("string | string[]");
  }
}

export class EmptyOrInvalidTokenException extends UnauthorizedException {
  constructor() {
    super(generateErrorContent('A_0001'));
  }
}

export class InsufficientPermissionException extends ForbiddenException {
  constructor() {
    super(generateErrorContent('A_0003'));
  }
}