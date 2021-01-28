import { HttpException, Type } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { ResponseObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export type Func = () => void;

export interface ApiExceptionOptions extends Omit<ResponseObject, 'description'> {
    description?: string;
    type?: Func | [Func];
    isArray?: boolean;
    schema?: SchemaObject;
}

export const CustomApiException = <T extends HttpException>(
  exception: () => Type<T>,
  options: ApiExceptionOptions = {}
): MethodDecorator & ClassDecorator => {
    const instance = new (exception())();
    const response = instance.getResponse();

    let shouldUseObjectSchema: boolean = false;
    let message = instance.message;

    const responseSchema = {
      type: 'object',
      properties: { }
    };

    if (instance.getStatus() === 400) {
      shouldUseObjectSchema = false;
      message = response['message'];
    } else if (typeof response === 'object') {
      shouldUseObjectSchema = true;

      if (typeof response === 'object') {
        Object.keys(response).forEach((key: string) => {
          responseSchema.properties[key] = {
            type: typeof response[key],
            example: response[key]
          }
        });
      }
    }

    const messageSchema =  {
      type: 'string',
      example: message
    };

    const schema = {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: instance.getStatus(),
        },
        message: (shouldUseObjectSchema) ? responseSchema : messageSchema,
        timestamp: {
          type: 'string',
          example: new Date().toISOString(),
        },
        path: {
          type: 'string',
        }
      },
      required: ['statusCode', 'message'],
    };

    const apiResponseOptions: ApiResponseOptions = {
      status: instance.getStatus(),
      description: options?.description || instance.message,
      schema: schema,
    };

    return ApiResponse(apiResponseOptions);
};