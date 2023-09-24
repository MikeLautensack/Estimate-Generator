import type { Config } from "drizzle-kit"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

export default {
  schema: "./src/db/schemas/*",
  out: "./src/db/drizzle",
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  }
} satisfies Config