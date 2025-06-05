import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
  schema: "./src/db/schemas/*",
  out: "./src/db/drizzle",
  dialect: 'postgresql',
  schemaFilter: ["public"],
  dbCredentials: {
    url: process.env.SUPABASE_CONNECTION_STRING!,
  },
});