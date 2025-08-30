import { afterEach, describe, expect, it } from "vitest";
import { prisma } from "../../lib/prisma/prisma.js";
import user from "./user.js";

describe("user routes", () => {
  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  describe("POST /signup", () => {
    it("foobar", async () => {
      const res = await user.request("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "test",
          password: "testpassword",
        }),
      });
      expect(res.status).toBe(200);
    });
  });
});
