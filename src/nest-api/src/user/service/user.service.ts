import {
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { from, Observable, of, throwError } from "rxjs";
import { map, catchError, switchMap } from 'rxjs/operators';

import {
  UserNotFoundException,
  InvalidCredentialException,
  EmailAlreadyExistsException,
} from "./../../common/exceptions/exception-thrower";

import {
  UserEntity
} from '../entities/user.entity';
import {
  CreateUserDTO,
  UpdateUserDTO,
  LoginUserDTO,
  LoginUserResponseDTO,
} from './../dto/user.dto';

import {
  AuthService,
} from './../../auth/service/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) { }

  create(user: CreateUserDTO): Observable<UserEntity> {
    return from(
      this.findByEmail(user.email)
    ).pipe(
      map((user: UserEntity) => {
        if (user) {
          throw new EmailAlreadyExistsException();
        }
        return null;
      }),
      switchMap(_ => {
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
      })
    )
  }

  findAll() {
    return from(this.userRepo.find());
  }

  findOne(userId: string) {
    return from(
      this.userRepo.findOne({
        userId: userId,
      })
    ).pipe(
      this.validateUserExistence()
    )
  }

  findById(userId: string) {
    return from(
      this.userRepo.findOne({
        userId: userId,
      })
    );
  }

  findByEmail(email: string) {
    return from(
      this.userRepo.findOne({
        email: email,
      })
    )
  }

  delete(userId: string) {
    return from(
      this.findById(userId)
    ).pipe(
      this.validateUserExistence(),
      switchMap((oldUser: UserEntity) => {
        return this.userRepo.delete({
          userId: oldUser.userId,
        })
      })
    )
  }

  update(
    userId: string,
    user: UpdateUserDTO,
  ) {
    return from(
      this.findById(userId)
    ).pipe(
      this.validateUserExistence(),
      switchMap((userEntity: UserEntity) => {
        userEntity.firstName = user.firstName || userEntity.firstName;
        userEntity.lastName = user.lastName || userEntity.lastName;
        return this.userRepo.update({ userId: userId}, userEntity);
      })
    )
  }

  login(user: LoginUserDTO): Observable<LoginUserResponseDTO> {
    return this.validateUser(user.email, user.password)
      .pipe(
        switchMap((user: UserEntity) => {
          return this.authService.generateJWT(user);
        }),
        map((jwt: string) => {
          return new LoginUserResponseDTO(jwt);
        })
      );
  }

  validateUser(
    email: string,
    password: string,
  ) {
    return this.findByEmail(email)
      .pipe(
        map((user: UserEntity) => {
          if (!user) {
            throw new InvalidCredentialException();
          }
          return user;
        }),
        switchMap((user: UserEntity) => {
          return this.authService
            .comparePasswords(
              password,
              user.password
            )
            .pipe(
              map((match: boolean) => {
                if (!match) {
                  throw new InvalidCredentialException();
                }
                return user;
              })
            );
        })
      )
  }

  validateUserExistence() {
    return map((user: UserEntity) => {
      if (!user) {
        throw new UserNotFoundException();
      }
      return user;
    })
  }
}
