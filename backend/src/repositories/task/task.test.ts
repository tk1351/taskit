import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET_TASKS_DATA } from "../../fixtures/task/task.js";
import { prisma } from "../../lib/prisma/prisma.js";
import { findMany } from "./task.js";

vi.mock("../../lib/prisma/prisma.ts", () => ({
  prisma: {
    task: {
      findMany: vi.fn(),
    },
  },
}));

describe("Testing task repositories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe("正常系", () => {
    it("正しくデータを返すこと", async () => {
      (prisma.task.findMany as ReturnType<typeof vi.fn>).mockResolvedValue(
        GET_TASKS_DATA,
      );

      const result = await findMany();
      expect(prisma.task.findMany).toHaveBeenCalledOnce();
      expect(result).toStrictEqual({
        success: true,
        data: GET_TASKS_DATA,
      });
    });
  });
  describe("非正常系", () => {
    it("エラーを返すこと", async () => {
      const mockError = new Error("Database error");
      (prisma.task.findMany as ReturnType<typeof vi.fn>).mockRejectedValue(
        mockError,
      );

      const result = await findMany();
      expect(result).toStrictEqual({
        success: false,
        error: new Error("Database error"),
      });
    });
  });
});
