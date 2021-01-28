import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from } from 'rxjs';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
  ) { }

  generateJWT(user: UserEntity): Observable<string> {
    return from(this.jwtService.signAsync({ user }))
  }

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  comparePasswords(
    newPassword: string,
    hashPassword: string
  ): Observable<boolean> {
    return from(bcrypt.compare(newPassword, hashPassword));
  }
}
