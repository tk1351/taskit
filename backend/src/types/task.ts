import type { Prisma } from "../../generated/prisma/index.js";

export type GetTasks = Prisma.TaskGetPayload<{ include: { status: true } }>[];
