import {
  mysqlTable,
  varchar,
  bigint,
} from "drizzle-orm/mysql-core"

export const profiles = mysqlTable(
    "profiles", 
{
  id: bigint('id', { mode: 'number' }).notNull().primaryKey(),
  business_name: varchar('business_name', { length: 255 }),
  business_address: varchar('business_address', { length: 255 }),
  business_email: varchar('business_email', { length: 255 }),
  business_phone: varchar('business_phone', { length: 255 }),
  user_id: bigint('user_id', { mode: 'number' })
})