import { prisma } from "../../lib/prisma/prisma.js";
import type { Result } from "../../types/index.js";
import type { GetTasks } from "../../types/task.js";

export async function findMany(): Promise<Result<GetTasks, Error>> {
  try {
    const data = await prisma.task.findMany({
      include: {
        status: true,
      },
      orderBy: {
        position: "asc",
      },
    });
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error : new Error("Unknown error occurred"),
    };
  }
}
