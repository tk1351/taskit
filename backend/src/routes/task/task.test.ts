import { describe, expect, it } from "vitest";
import task from "./task.js";

describe("Testing task routes", () => {
  describe("GET", () => {
    it("/", async () => {
      const res = await task.request("/");
      expect(res.status).toBe(200);
    });
  });
});
