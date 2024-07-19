import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// create the connection
const sql = neon(process.env.NEON_DB!);
const db = drizzle(sql);
export type DbClient = typeof db;

export { db };
