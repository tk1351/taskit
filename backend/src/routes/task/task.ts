import { Hono } from "hono";
import { getTasks } from "../../services/task/getTasks.js";

const task = new Hono();

task.get("/", async (c) => {
  const result = await getTasks();
  return c.json(result);
});

export default task;
