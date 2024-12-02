import { relations } from "drizzle-orm";
import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const changeOrders = pgTable("changeOrders", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  contractor_user_id: uuid("contractor_user_id"),
  customer_user_id: uuid("customer_user_id"),
  customer_id: uuid("customer_id"),
  estimate_id: uuid("estimate_id"),
  changeOrderName: varchar("change_order_name", { length: 255 }),
  customerName: varchar("customer_name", { length: 255 }),
  description: varchar("description", { length: 255 }),
  estimateName: varchar("estimate_name", { length: 255 }),
  projectAddress: varchar("project_address", { length: 255 }),
  status: varchar("status", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export type ChangeOrdersInsert = typeof changeOrders.$inferInsert;
export type ChangeOrdersSelect = typeof changeOrders.$inferSelect;

// Zod schema for inserting a estimate - can be used to validate API requests
export const insertChangeOrdersSchema = createInsertSchema(changeOrders);
// Zod schema for selecting a estimate - can be used to validate API responses
export const selectChangeOrdersSchema = createSelectSchema(changeOrders);

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
