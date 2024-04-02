import { pgTable, varchar, bigint, timestamp } from "drizzle-orm/pg-core";

export const workOrders = pgTable("customers", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey(),
  orderName: varchar("order_name", { length: 255 }).notNull(),
  workAddress: varchar("work_address", { length: 255 }).notNull(),
  dateCreated: timestamp("date_created", { mode: "date" }).notNull(),
  dateUpdated: timestamp("date_updated", { mode: "date" }).notNull(),
  contractor_user_id: bigint("contractor_user_id", {
    mode: "number",
  }).notNull(),
  customer_user_id: varchar("customer_user_id", { length: 255 }).notNull(),
});
