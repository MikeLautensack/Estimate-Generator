import {
  pgTable,
  varchar,
  timestamp,
  text,
  foreignKey,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { estimates } from "./estimates";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./auth";

export const contractorsCustomers = pgTable(
  "contractors_customers",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    contractor_user_id: uuid("contractor_user_id").notNull(),
    customer_user_id: uuid("customer_user_id").notNull(),
    address: varchar("address", { length: 255 }).notNull(),
    address2: varchar("address2", { length: 255 }).notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    state: varchar("state", { length: 255 }).notNull(),
    zip: varchar("zip", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    foreignKey({
      columns: [table.contractor_user_id],
      foreignColumns: [users.id],
      name: "contractors_customers_contractor_user_id_fkey",
    }),
    foreignKey({
      columns: [table.customer_user_id],
      foreignColumns: [users.id],
      name: "contractors_customers_customer_user_id_fkey",
    }),
  ],
);

export type CustomersInsert = typeof contractorsCustomers.$inferInsert;
export type CustomersSelect = typeof contractorsCustomers.$inferSelect;

// Zod schema for inserting a customer - can be used to validate API requests
export const insertCustomerSchema = createInsertSchema(contractorsCustomers);
// Zod schema for selecting a customer - can be used to validate API responses
export const selectCustomerSchema = createSelectSchema(contractorsCustomers);

export const customerContractorRelationship = relations(
  contractorsCustomers,
  ({ one }) => ({
    author: one(users, {
      fields: [contractorsCustomers.contractor_user_id],
      references: [users.id],
    }),
  }),
);

export const customerCustomerRelationship = relations(
  contractorsCustomers,
  ({ one }) => ({
    author: one(users, {
      fields: [contractorsCustomers.customer_user_id],
      references: [users.id],
    }),
  }),
);

export const userEstimateRelationship = relations(
  contractorsCustomers,
  ({ many }) => ({
    posts: many(estimates),
  }),
);
