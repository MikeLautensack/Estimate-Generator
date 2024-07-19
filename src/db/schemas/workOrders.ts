import { pgTable, varchar, bigint, timestamp } from "drizzle-orm/pg-core";

export const workOrders = pgTable("workOrders", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey(),
  contractor_user_id: bigint("contractor_user_id", {
    mode: "number",
  }).notNull(),
  customer_user_id: varchar("customer_user_id", { length: 255 }).notNull(),
  orderName: varchar("order_name", { length: 255 }).notNull(),
  workAddress: varchar("work_address", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
