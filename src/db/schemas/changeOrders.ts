import { relations } from "drizzle-orm";
import { pgTable, varchar, bigint, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const changeOrders = pgTable("changeOrders", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey(),
  estimateName: varchar("estimate_name", { length: 255 }),
  changeOrderName: varchar("change_order_name", { length: 255 }),
  description: varchar("description", { length: 255 }),
  customerName: varchar("customer_name", { length: 255 }),
  projectAddress: varchar("project_address", { length: 255 }),
  status: varchar("status", { length: 255 }),
  dateCreated: timestamp("date_created", { mode: "date" }).notNull(),
  dateUpdated: timestamp("date_updated", { mode: "date" }).notNull(),
  estimate_id: bigint("estimate_id", { mode: "number" }),
  contractor_user_id: bigint("contractor_user_id", { mode: "number" }),
  customer_user_id: bigint("customer_user_id", { mode: "number" }),
});

export const customerUserRelationship = relations(changeOrders, ({ one }) => ({
  author: one(users, {
    fields: [changeOrders.contractor_user_id],
    references: [users.id],
  }),
}));

export const contractorUserRelationship = relations(
  changeOrders,
  ({ one }) => ({
    author: one(users, {
      fields: [changeOrders.customer_user_id],
      references: [users.id],
    }),
  }),
);
