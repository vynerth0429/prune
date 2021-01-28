import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
} from "typeorm";
import {
  ApiProperty,
} from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiProperty({
    example: "2020-11-20T06:46:13.052Z",
    description: "Date of the data is created"
  })
  @CreateDateColumn()
  createdOn: Date;

  @ApiProperty({
    example: "2020-11-21T06:56:56.665Z",
    description: "Date of the data is updated"
  })
  @Column({
    nullable: true,
  })
  modifiedOn: Date;

  @BeforeUpdate()
  updateModifiedOn() {
    this.modifiedOn = new Date();
  }
}