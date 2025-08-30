import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import user from "./routes/user/user.js";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/user", user);

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
