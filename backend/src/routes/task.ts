import { Hono } from "hono";

const task = new Hono();

task.get("/", (c) => {
  return c.json({ task: true });
});

export default task;
