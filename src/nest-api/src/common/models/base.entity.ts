import {
  Column,
  CreateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
  @CreateDateColumn()
  createdOn: Date;

  @Column({
    nullable: true,
  })
  modifiedOn: Date;
}