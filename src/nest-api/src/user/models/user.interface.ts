export type TUserRequest = {
  email: string,
  firstName: string,
  lastName:	string,
  password: string,
}

export type TUserResponse = {
  userId: string,
  email: string,
  firstName: string,
  lastName:	string,
  isVerified:	boolean,
  createdOn: Date,
  modifiedOn: Date,
}