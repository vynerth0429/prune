import {
  Entity,
  PrimaryColumn,
  Column,
  Generated,
  BeforeInsert,
} from "typeorm";
import {
  Exclude,
  classToPlain,
} from "class-transformer";

import {
  BaseEntity,
} from "src/common/models/base.entity";

import { IUser } from './user.interface';

@Entity({
  name: 'user'
})
export class UserEntity extends BaseEntity implements IUser {

  @PrimaryColumn({
    update: false
  })
  @Generated("uuid")
  userId: string;

  @Column({
    unique: true,
  })
  email:	string;

  @Exclude({
    toPlainOnly: true
  })
  @Column()
  password: string;

  @Column("varchar", {
    length: 200
  })
  firstName:	string;

  @Column("varchar", {
    length: 200
  })
  lastName:	string;

  @Column({
    nullable: true,
    default: false,
  })
  isVerified:	boolean;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  toJSON () {
    return classToPlain(this);
  }
}