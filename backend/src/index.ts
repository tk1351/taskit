import { serve } from "@hono/node-server";
import { Hono } from "hono";
import task from "./routes/task/task.js";
import type { RouteName } from "./types/index.js";

const endpoint = (value: RouteName): string => `/api/${value}`;

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route(endpoint("tasks"), task);

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
