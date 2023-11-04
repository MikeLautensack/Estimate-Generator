import { drizzle } from "drizzle-orm/planetscale-serverless"
import { connect } from "@planetscale/database"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })
 
// create the connection
const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
})
 
const db = drizzle(connection)
export type DbClient = typeof db

export {
  db
}