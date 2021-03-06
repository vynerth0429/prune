import { UserRoleEnum } from './../types/user-role.enum';
import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  Exclude,
  classToPlain,
} from "class-transformer";
import {
  ApiProperty,
} from '@nestjs/swagger';

import {
  BaseEntity,
} from "src/common/models/base.entity";

@Entity({
  name: 'user'
})
export class UserEntity extends BaseEntity {

  @ApiProperty({
    example: "0bd4e4c5-5d7e-4ed5-8764-3d784c1e5abd",
    description: "Unique valid uuid value"
  })
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @ApiProperty({
    example: "exam@sample.com",
    description: "Unique valid email address"
  })
  @Column({
    unique: true,
  })
  email:	string;

  @Exclude({
    toPlainOnly: true
  })
  @Column()
  password: string;

  @ApiProperty({
    example: "Jake",
    description: "First name"
  })
  @Column("varchar", {
    length: 200
  })
  firstName:	string;

  @ApiProperty({
    example: "Weary",
    description: "Last name"
  })
  @Column("varchar", {
    length: 200
  })
  lastName:	string;

  @ApiProperty({
    example: false,
    description: "Status of user's verification"
  })
  @Column({
    nullable: true,
    default: false,
  })
  isVerified:	boolean;

  @ApiProperty({
    example: UserRoleEnum.USER,
    description: "User role",
    type: 'enum',
    enum: UserRoleEnum,
  })
  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  toJSON () {
    return classToPlain(this);
  }
}