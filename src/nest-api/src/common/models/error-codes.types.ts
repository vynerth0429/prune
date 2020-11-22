export enum ErrorCodesEnum {
  A_0001 = 'Email already exists',
  A_0002 = 'Token not found or invalid',
  U_0001 = 'User not found',
  U_0002 = 'Invalid credentials',
};

export type TErrorCodesEnum = keyof typeof ErrorCodesEnum;

export type TErrorContent = {
  errorCode: TErrorCodesEnum,
  errorDescription: string,
}

export type TErrorResponse<T> = {
  statusCode: number,
  message: T,
  timestamp: string,
  path: string,
}