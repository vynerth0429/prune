import {
  UpdateResult,
  DeleteResult
} from 'typeorm';

import {
  ApiProperty,
} from '@nestjs/swagger';

export class UpdateResultDTO implements UpdateResult {
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

export class DeleteResultDTO implements DeleteResult {
  @ApiProperty({
    example: [],
  })
  raw: any;

  @ApiProperty({
    example: 1,
  })
  affected?: number;
}
