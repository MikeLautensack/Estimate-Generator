import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { execSync } from "child_process";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config({ path: ".env.test.local" });

// Test Supabase client with service role for admin operations
let supabaseAdmin = null;
let supabaseClient = null;

export function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    );
  }
  return supabaseAdmin;
}

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );
  }
  return supabaseClient;
}

/**
 * Sets up the Supabase + Postgres test environment
 */
export async function setupSupabaseTest() {
  try {
    // Verify environment variables are loaded
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error(
        "Environment variables not loaded. Check .env.test.local file.",
      );
    }

    console.log("🗄️  Resetting test database...");
    execSync("npx supabase db reset --local", { stdio: "inherit" });

    console.log("📦 Applying Drizzle migrations...");
    // Assumes drizzle.config.ts is in project root
    execSync("npx drizzle-kit push:pg", { stdio: "inherit" });

    console.log("✅ Database ready for tests");
  } catch (error) {
    console.error("Failed to setup Supabase test environment:", error);
    throw error;
  }
}

/**
 * Cleans up after tests.
 */
export async function cleanupSupabaseTest() {
  try {
    console.log("🧹 Cleaning up Supabase test environment...");
    // Optional: drop all data, reset db again, etc.
    execSync("npx supabase db reset --local", { stdio: "inherit" });
    console.log("✅ Test environment cleaned up");
  } catch (error) {
    console.error("❌ Failed to cleanup Supabase test environment:", error);
  }
}

/**
 * Seed data util (can be extended later).
 */
export async function seedTestData() {
  const supabase = getSupabaseAdmin();

  console.log("🌱 Seeding test data...");
  // Example:
  // await supabase.from("users").insert([{ email: "test@example.com" }]);

  console.log("✅ Test data seeded");
}
