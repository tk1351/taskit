import type { BaseErrorType, ErrorType } from "../../types/error/error.js";

export function throwError<T extends ErrorType>(
  type: T,
  message: string,
): never {
  throw {
    type,
    message,
  } satisfies BaseErrorType<T>;
}
