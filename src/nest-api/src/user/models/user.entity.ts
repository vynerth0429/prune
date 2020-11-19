import {
  Entity,
  PrimaryColumn,
  Column,
  Generated,
} from "typeorm";

import {
  BaseEntity,
} from "src/common/models/base.entity";

@Entity({
  name: 'user'
})
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  email:	string;

  @Column({
    update: false,
  })
  @Generated("uuid")
  userId?: string;

  @Column("varchar", {
    length: 200
  })
  firstName:	string;

  @Column("varchar", {
    length: 200
  })
  lastName:	string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    default: false,
  })
  isVerified?:	boolean;
}