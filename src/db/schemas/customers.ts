import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { relations } from "drizzle-orm";
import { estimates } from "./estimates";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
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
});

export type CustomersInsert = typeof customers.$inferInsert;
export type CustomersSelect = typeof customers.$inferSelect;

// Zod schema for inserting a customer - can be used to validate API requests
export const insertCustomerSchema = createInsertSchema(customers);
// Zod schema for selecting a customer - can be used to validate API responses
export const selectCustomerSchema = createSelectSchema(customers);

export const customerContractorRelationship = relations(
  customers,
  ({ one }) => ({
    author: one(users, {
      fields: [customers.contractor_user_id],
      references: [users.id],
    }),
  }),
);

export const customerCustomerRelationship = relations(customers, ({ one }) => ({
  author: one(users, {
    fields: [customers.customer_user_id],
    references: [users.id],
  }),
}));

export const userEstimateRelationship = relations(customers, ({ many }) => ({
  posts: many(estimates),
}));
