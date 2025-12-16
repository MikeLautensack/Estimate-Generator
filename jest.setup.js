import dotenv from "dotenv";
import {
  setupSupabaseTest,
  cleanupSupabaseTest,
} from "@/__tests__/global/setup";

// Load test environment variables
dotenv.config({ path: ".env.test.local" });

// Set test environment
process.env.NODE_ENV = "test";

// Global test setup and teardown
beforeAll(async () => {
  console.log("🔧 Setting up test environment...");
  await setupSupabaseTest();
  console.log("✅ Test environment ready");
});

afterAll(async () => {
  console.log("🧹 Cleaning up test environment...");
  await cleanupSupabaseTest();
  console.log("✅ Test environment cleaned up");
});

// Global error handler for unhandled promises
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
