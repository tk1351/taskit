import type { ERROR_MESSAGES } from "../../constants/error/error.js";

export type ErrorType = "UNIQUE_CONSTRAINT_ERROR" | "INTERNAL_SERVER_ERROR";
export type BaseErrorType<T extends ErrorType> = {
  type: T;
  message: string;
};

export type CreateUserErrorType =
  | BaseErrorType<"UNIQUE_CONSTRAINT_ERROR">
  | BaseErrorType<"INTERNAL_SERVER_ERROR">;

export type ErrorDefinitions = {
  [K in ErrorType]: {
    type: K;
    message: (typeof ERROR_MESSAGES)[K];
  };
};

export type ServiceError = ErrorDefinitions[keyof ErrorDefinitions];
