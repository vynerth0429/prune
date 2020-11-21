import {
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

import { ExceptionParser } from './exception-parser';

const throwUserNotFound = () => {
  throw new ExceptionParser(NotFoundException, "U_0001");
}

const throwInvalidCredential = () => {
  throw new ExceptionParser(UnauthorizedException, "U_0002");
}

export {
  throwUserNotFound,
  throwInvalidCredential
}