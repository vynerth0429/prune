import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Allow,
} from 'class-validator';

import {
  ApiProperty
} from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    example: "exam@sample.com",
    description: "Unique valid email address"
  })
  @IsEmail({}, {
    message: 'Invalid email format'
  })
  email: string;

  @ApiProperty({
    example: "Jake",
    description: "First name"
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: "Weary",
    description: "Last name"
  })
  @IsNotEmpty()
  @IsString()
  lastName:	string;

  @ApiProperty({
    example: "secret-password",
    description: "Password to be hashed"
  })
  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDTO {
  @ApiProperty({
    example: "Jake",
    description: "First name",
  })
  @Allow()
  firstName: string;

  @ApiProperty({
    example: "Weary",
    description: "Last name"
  })
  @Allow()
  lastName:	string;
}

export class LoginUserDTO {
  @ApiProperty({
    example: "exam@sample.com",
    description: "Unique valid email address"
  })
  @IsEmail({}, {
    message: 'Invalid email format'
  })
  email: string;

  @ApiProperty({
    example: "secret-password",
    description: "Password to be hashed"
  })
  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginUserResponseDTO {
  constructor(jwt: string) {
    this.accessToken = jwt;
  }

  @ApiProperty({
    example: "xxxxx.yyyyy.zzzzz",
    description: "Access token"
  })
  accessToken: string;
}
