import { pgTable, varchar, bigint, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { relations } from "drizzle-orm";
import { estimates } from "./estimates";

export const customers = pgTable("customers", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey(),
  contractor_user_id: bigint("contractor_user_id", {
    mode: "number",
  }).notNull(),
  customer_user_id: varchar("customer_user_id", { length: 255 }).notNull(),
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
