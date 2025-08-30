import type {
  BaseErrorType,
  ErrorType,
  ServiceError,
} from "../../types/error/error.js";

export function throwError<T extends ErrorType>(
  type: T,
  message: string,
): never {
  throw {
    type,
    message,
  } satisfies BaseErrorType<T>;
}

export function throwResultError(error: ServiceError): never {
  throw {
    ok: false,
    error,
  };
}
