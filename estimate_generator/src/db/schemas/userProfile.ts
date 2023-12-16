import {
  mysqlTable,
  varchar,
  bigint,
  timestamp,
} from "drizzle-orm/mysql-core"

export const profiles = mysqlTable(
    "profiles", 
{
  id: bigint('id', { mode: 'number' }).notNull().primaryKey(),
  businessName: varchar('business_name', { length: 255 }),
  businessAddress: varchar('business_address', { length: 255 }),
  businessEmail: varchar('business_email', { length: 255 }),
  businessPhone: varchar('business_phone', { length: 255 }),
  dateCreated: timestamp("date_created", { mode: "date" }).notNull(),
  dateUpdated: timestamp("date_updated", { mode: "date" }).notNull(),
  user_id: bigint('user_id', { mode: 'number' })
})