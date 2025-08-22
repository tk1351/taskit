import { findMany } from "../../repositories/task/task.js";
import type { Result } from "../../types/index.js";
import type { GetTasks } from "../../types/task.js";

export async function getTasks(): Promise<Result<GetTasks, Error>> {
  return await findMany();
}
