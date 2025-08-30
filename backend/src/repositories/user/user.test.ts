import { afterEach, describe, expect, it, vi } from "vitest";
import { prisma } from "../../lib/prisma/prisma.js";
import { createUser } from "./user.js";

describe("Testing user repository", () => {
  afterEach(async () => {
    await prisma.user.deleteMany();
  });
  describe("createUser", () => {
    it("正しくユーザーが作成されること", async () => {
      const result = await createUser({
        username: "testuser",
        passwordHash: "testpasswordhash",
      });
      expect(result.username).toBe("testuser");
    });
    it("重複するusernameでエラーが発生すること", async () => {
      // 最初のユーザー作成
      await createUser({
        username: "duplicate",
        passwordHash: "hash1",
      });

      // 同じusernameで再度作成してエラーを期待
      await expect(
        createUser({
          username: "duplicate",
          passwordHash: "hash2",
        }),
      ).rejects.toMatchObject({
        type: "UNIQUE_CONSTRAINT_ERROR",
      });
    });
    it("他のエラーの場合にINTERNAL_SERVER_ERRORが返されること", async () => {
      // prisma.user.createをモックして、一般的なエラーを投げる
      vi.spyOn(prisma.user, "create").mockRejectedValueOnce(
        new Error("Database connection failed"),
      );

      await expect(
        createUser({
          username: "testuser",
          passwordHash: "hash",
        }),
      ).rejects.toMatchObject({
        type: "INTERNAL_SERVER_ERROR",
        message: "Database connection failed",
      });
    });
  });
});
