import { HttpException } from '@nestjs/common';

import {
  TErrorCodesEnum,
  TErrorContent,
  ErrorCodesEnum,
} from './../models/error-codes.types';

export class ExceptionParser<T extends HttpException> extends HttpException {

  constructor(
    TCreator: { new (objectOrError?: TErrorContent): T; },
    errorCode: TErrorCodesEnum,
  ) {
    const errorContent: TErrorContent = {
      errorCode: errorCode,
      errorDescription: ErrorCodesEnum[errorCode]
    }
    const exception = new TCreator(errorContent);
    super(exception.getResponse(), exception.getStatus());
  }
}
