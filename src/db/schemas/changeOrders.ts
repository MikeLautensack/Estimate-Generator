import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  uuid,
  foreignKey,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { jobs } from "./jobs";

export const changeOrders = pgTable(
  "change_orders",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    job_id: uuid("job_id").notNull(),
    changeOrderName: varchar("change_order_name", { length: 255 }),
    customerName: varchar("customer_name", { length: 255 }),
    description: varchar("description", { length: 255 }),
    estimateName: varchar("estimate_name", { length: 255 }),
    projectAddress: varchar("project_address", { length: 255 }),
    status: varchar("status", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    foreignKey({
      columns: [table.job_id],
      foreignColumns: [jobs.id],
      name: "change_orders_job_id_fkey",
    }),
  ],
);

export type ChangeOrdersInsert = typeof changeOrders.$inferInsert;
export type ChangeOrdersSelect = typeof changeOrders.$inferSelect;

// Zod schema for inserting a estimate - can be used to validate API requests
export const insertChangeOrdersSchema = createInsertSchema(changeOrders);
// Zod schema for selecting a estimate - can be used to validate API responses
export const selectChangeOrdersSchema = createSelectSchema(changeOrders);

export const customerUserRelationship = relations(changeOrders, ({ one }) => ({
  author: one(jobs, {
    fields: [changeOrders.job_id],
    references: [jobs.id],
  }),
}));

export const contractorUserRelationship = relations(
  changeOrders,
  ({ one }) => ({
    author: one(jobs, {
      fields: [changeOrders.job_id],
      references: [jobs.id],
    }),
  }),
);
