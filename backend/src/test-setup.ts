import { exec } from "node:child_process";
import { promisify } from "node:util";
import { afterAll, beforeAll } from "vitest";

const execAsync = promisify(exec);

beforeAll(async () => {
  console.log("🚀 Setting up test database...");
  // Generate Prisma client first
  await execAsync("npx prisma generate", {
    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL },
  });
  // Run Prisma migrations on test database
  await execAsync("npx prisma migrate deploy", {
    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL },
  });
  console.log("✅ Test database setup complete!");
});

afterAll(async () => {
  console.log("🧹 Cleaning up test database...");
  // Clean up test database if needed
  // You can add cleanup logic here
  console.log("🏁 Test database cleanup complete!");
});
