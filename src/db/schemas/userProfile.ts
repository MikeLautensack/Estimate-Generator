import { pgTable, varchar, bigint, timestamp } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey(),
  user_id: bigint("user_id", { mode: "number" }).notNull(),
  businessAddress: varchar("business_address", { length: 255 }).notNull(),
  businessEmail: varchar("business_email", { length: 255 }).notNull(),
  businessName: varchar("business_name", { length: 255 }).notNull(),
  businessPhone: varchar("business_phone", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
