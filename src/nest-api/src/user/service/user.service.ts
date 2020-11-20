import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { from, Observable, throwError } from "rxjs";
import { map, catchError, switchMap } from 'rxjs/operators';

import {
  UserEntity
} from './../models/user.entity';
import {
  TUserRequest,
} from './../models/user.interface';

import {
  AuthService,
} from './../../auth/service/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private authService: AuthService,
  ) { }

  create(user: TUserRequest): Observable<UserEntity> {
    return this.authService
      .hashPassword(user.password)
      .pipe(
        switchMap((hashPassword: string) => {
          const newUser = new UserEntity();
          newUser.email = user.email;
          newUser.firstName = user.firstName;
          newUser.lastName = user.lastName;
          newUser.password = hashPassword;

          return from(
            this.userRepo.save(newUser)
          ).pipe(
            catchError((error) => throwError(error))
          );
        })
      )
  }

  findAll() {
    return from(this.userRepo.find());
  }

  findById(userId: string) {
    return from(this.userRepo.findOne({
      userId: userId,
    }))
  }

  findByEmail(email: string) {
    return from(this.userRepo.findOne({
      email: email,
    }));
  }

  delete(userId: string) {
    return from(this.userRepo.delete({
      userId: userId,
    }));
  }

  update(
    userId: string,
    user: TUserRequest,
  ) {
    delete user.email;
    delete user.password;

    return from(
      this.userRepo.update(
        {
          userId: userId
        },
        {
          ...user,
          modifiedOn: new Date(),
        },
      )
    );
  }

  login(user: TUserRequest) {
    return this.validateUser(user.email, user.password)
      .pipe(
        switchMap((user: UserEntity) => {
          if (user) {
            return this.authService.generateJWT(user);
          }
        })
      );
  }

  validateUser(
    email: string,
    password: string,
  ) {
    return this.findByEmail(email)
      .pipe(
        switchMap((user: UserEntity) => {
          return this.authService
            .comparePasswords(
              password,
              user.password
            )
            .pipe(
              map((match: boolean) => {
                if (match) {
                  return user;
                } else {
                  throw new Error('Invalid credentitals');
                }
              })
            );
        })
      )
  }
}
