import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
 
// create the connection
const sql = neon(process.env.NEON_DB!)
const db = drizzle(sql);
export type DbClient = typeof db;

export {
  db
}