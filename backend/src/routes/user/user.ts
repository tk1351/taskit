import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { signUpSchema } from "../../schema/user/user.js";
import { signUp } from "../../services/user/signUp.js";

const user = new Hono();

user.get("/", (c) => {
  return c.text("user '/'");
});

user.post("/signup", zValidator("json", signUpSchema), async (c) => {
  const validated = c.req.valid("json");
  const result = await signUp(validated);
  return c.json(result, 200);
});

export default user;
