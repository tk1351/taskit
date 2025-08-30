import type { ErrorDefinitions } from "../../types/error/error.js";

export const ERROR_MESSAGES = {
  UNIQUE_CONSTRAINT_ERROR: "既に存在するユーザー名です。",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
} as const;

export const ERROR_DEFINITIONS = {
  UNIQUE_CONSTRAINT_ERROR: {
    type: "UNIQUE_CONSTRAINT_ERROR",
    message: ERROR_MESSAGES.UNIQUE_CONSTRAINT_ERROR,
  },
  INTERNAL_SERVER_ERROR: {
    type: "INTERNAL_SERVER_ERROR",
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  },
} as const satisfies ErrorDefinitions;
