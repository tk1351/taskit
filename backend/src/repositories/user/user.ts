import { Prisma } from "../../../generated/prisma/index.js";
import { throwError } from "../../lib/error/error.js";
import { prisma } from "../../lib/prisma/prisma.js";
import type {
  CreateUserInputType,
  CreateUserResponseType,
} from "../../types/user/user.js";

export const createUser = async (
  data: CreateUserInputType,
): Promise<CreateUserResponseType> => {
  try {
    const result = await prisma.user.create({
      data,
      omit: {
        passwordHash: true,
      },
    });
    return result;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throwError("UNIQUE_CONSTRAINT_ERROR", error.message);
      }
    }
    throwError(
      "INTERNAL_SERVER_ERROR",
      error instanceof Error ? error.message : "Unknown error occurred",
    );
  }
};
