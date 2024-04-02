import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default {
  schema: "./src/db/schemas/*",
  out: "./src/db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.NEON_DB!,
  },
} satisfies Config;
