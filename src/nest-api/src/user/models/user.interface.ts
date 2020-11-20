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

export type TUserRequest = {
  email: string,
  firstName: string,
  lastName:	string,
  password: string,
}
