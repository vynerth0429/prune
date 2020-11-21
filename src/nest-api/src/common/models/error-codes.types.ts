export enum ErrorCodesEnum {
  U_0001 = 'User not found',
  U_0002 = 'Invalid credentials',
};

export type TErrorCodesEnum = keyof typeof ErrorCodesEnum;

export type TErrorContent = {
  errorCode: TErrorCodesEnum,
  errorDescription: string,
}
