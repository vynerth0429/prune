import {
  UpdateResult,
  DeleteResult
} from 'typeorm';

import {
  ApiProperty,
} from '@nestjs/swagger';

export class ExceptionDTO implements UpdateResult {
  @ApiProperty({
    example: [],
  })
  raw: any;

  @ApiProperty({
    example: 1,
  })
  affected?: number;

  @ApiProperty({
    example: [],
  })
  generatedMaps: any[];
}

