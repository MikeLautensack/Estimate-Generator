import { pgTable, varchar, bigint, timestamp } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey(),
  businessName: varchar("business_name", { length: 255 }).notNull(),
  businessAddress: varchar("business_address", { length: 255 }).notNull(),
  businessEmail: varchar("business_email", { length: 255 }).notNull(),
  businessPhone: varchar("business_phone", { length: 255 }).notNull(),
  dateCreated: timestamp("date_created", { mode: "date" }).notNull(),
  dateUpdated: timestamp("date_updated", { mode: "date" }).notNull(),
  user_id: bigint("user_id", { mode: "number" }).notNull(),
});
