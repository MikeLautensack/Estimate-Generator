import { pgTable, bigint, timestamp } from "drizzle-orm/pg-core";

export const invoices = pgTable("invoices", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey(),
  user_id: bigint("user_id", { mode: "number" }).notNull(),
  price: bigint("price", { mode: "number" }).notNull(),
  tax: bigint("price", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
