import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { from, Observable } from "rxjs";

import {
  UserEntity
} from './../models/user.entity';
import {
  TUserRequest,
  TUserResponse
} from './../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
  ) { }

  create(user: TUserRequest): Observable<any> {
    let instance = this.userRepo.create();
    instance = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
    }

    return from(
      this.userRepo.save(instance)
    );
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
    return from(this.userRepo.find({
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
    user: Partial<TUserRequest>,
  ) {
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
}