import { Hono } from "hono";

const user = new Hono();

user.get("/", (c) => {
  return c.text("user '/'");
});

user.post("/signup", (c) => {
  return c.json({});
});

export default user;
