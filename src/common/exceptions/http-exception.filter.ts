import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

import { TErrorResponse } from './../models/error-codes.types';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let exceptionResponse = exception.getResponse();

    if (status === 400) {
      exceptionResponse = exceptionResponse['message'];
    }

    const jsonResponse: TErrorResponse<any> = {
      statusCode: status,
      message: exceptionResponse || exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    }

    response
      .status(status)
      .json(jsonResponse);
  }
}
