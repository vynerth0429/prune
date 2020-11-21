import { IsEmail, IsNotEmpty, IsString, MinLength, } from 'class-validator';

export interface IUser {
  userId: string,
  email: string,
  firstName: string,
  lastName:	string,
  isVerified:	boolean,
  createdOn: Date,
  modifiedOn: Date,
  password: string,
}

export class CreateUserDTO implements Partial<IUser> {
  @IsEmail({}, {
    message: 'Invalid email format'
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName:	string;

  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDTO implements Partial<IUser> {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName:	string;
}

export class LoginUserDTO implements Partial<IUser> {
  @IsEmail({}, {
    message: 'Invalid email format'
  })
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;
}
