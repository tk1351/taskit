import bcrypt from "bcrypt";
import { throwResultError } from "../../lib/error/error.js";
import { createUser } from "../../repositories/user/user.js";
import type { SignUpInputData } from "../../schema/user/user.js";
import type { BaseErrorType } from "../../types/error/error.js";

export const signUp = async (input: SignUpInputData) => {
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(input.password, saltRounds);
    const { password: _password, ...userData } = input;
    const { id, username } = await createUser({ ...userData, passwordHash });
    return {
      ok: true,
      data: {
        id,
        username,
      },
    };
  } catch (error) {
    const isUniqueConstraintError = (
      err: unknown,
    ): err is BaseErrorType<"UNIQUE_CONSTRAINT_ERROR"> =>
      err !== null &&
      typeof err === "object" &&
      "type" in err &&
      err.type === "UNIQUE_CONSTRAINT_ERROR";

    if (isUniqueConstraintError(error)) {
      throwResultError({
        type: "UNIQUE_CONSTRAINT_ERROR",
        message: "既に存在するユーザー名です。",
      });
    }

    throwResultError({
      type: "INTERNAL_SERVER_ERROR",
      message: "Internal Server Error",
    });
  }
};
