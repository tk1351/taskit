import type { Prisma, User } from "../../../generated/prisma/index.js";

export type CreateUserInputType = Prisma.UserCreateInput;
export type CreateUserResponseType = Omit<
  User,
  "passwordHash" | "passwordSalt"
>;
