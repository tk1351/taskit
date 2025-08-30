import { beforeEach, describe, expect, it, vi } from "vitest";
import * as userRepo from "../../repositories/user/user.js";
import { signUp } from "./signUp.js";

vi.mock("../../repositories/user/user.js", () => ({
  createUser: vi.fn(),
}));

describe("Testing signUp", () => {
  const mockCreateUser = vi.mocked(userRepo.createUser);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("成功するとユーザー情報を返すこと", async () => {
    mockCreateUser.mockResolvedValue({
      id: 1,
      username: "testuser",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await signUp({ username: "testuser", password: "password" });
    expect(result).toStrictEqual({
      ok: true,
      data: {
        id: 1,
        username: "testuser",
      },
    });
  });

  it("ユーザー名が重複する場合はエラーを返すこと", async () => {
    const error = {
      type: "UNIQUE_CONSTRAINT_ERROR",
      message: "Unique constraint failed",
    };
    mockCreateUser.mockRejectedValue(error);

    await expect(
      signUp({ username: "testuser", password: "password" }),
    ).rejects.toStrictEqual({
      ok: false,
      error: {
        type: "UNIQUE_CONSTRAINT_ERROR",
        message: "既に存在するユーザー名です。",
      },
    });
  });

  it("他のエラーの場合に正しくエラーを返すこと", async () => {
    const error = new Error("Database connection failed");
    mockCreateUser.mockRejectedValue(error);

    await expect(
      signUp({ username: "testuser", password: "password" }),
    ).rejects.toStrictEqual({
      ok: false,
      error: {
        type: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error",
      },
    });
  });
});
