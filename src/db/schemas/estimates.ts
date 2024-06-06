import {
  pgTable,
  varchar,
  bigint,
  timestamp,
  real,
  integer,
  serial,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { relations, sql } from "drizzle-orm";
import { customers } from "./customers";

export const estimates = pgTable("estimates", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey(),
  contractor_user_id: bigint("contractor_user_id", { mode: "number" }),
  customer_id: bigint("customer_id", { mode: "number" }),
  customer_user_id: bigint("customer_user_id", { mode: "number" }),
  contractorAddress: varchar("contractor_address", { length: 255 }),
  contractorName: varchar("contractor_name", { length: 255 }),
  contractorPhone: varchar("contractor_phone", { length: 255 }),
  customerEmail: varchar("customer_email", { length: 255 }),
  customerName: varchar("customer_name", { length: 255 }),
  estimateName: varchar("estimate_name", { length: 255 }),
  message: varchar("message", { length: 255 }),
  projectAddress: varchar("project_address", { length: 255 }),
  status: varchar("status", { length: 255 }),
  subtotal: real("subtotal").default(10.1),
  tax: real("tax").default(10.1),
  taxRate: real("tax_rate").default(10.1),
  total: real("total").default(10.1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const userEstimateRelationship = relations(estimates, ({ one }) => ({
  author: one(users, {
    fields: [estimates.contractor_user_id],
    references: [users.id],
  }),
}));

export const customerObjEstimateRelationship = relations(
  estimates,
  ({ one }) => ({
    author: one(customers, {
      fields: [estimates.customer_id],
      references: [customers.id],
    }),
  }),
);

export const customerUserEstimateRelationship = relations(
  estimates,
  ({ one }) => ({
    author: one(users, {
      fields: [estimates.customer_user_id],
      references: [users.id],
    }),
  }),
);

export const lineItemEstimateRelationship = relations(
  estimates,
  ({ many }) => ({
    posts: many(lineItems),
  }),
);

export const lineItems = pgTable("lineItems", {
  id: bigint("id", { mode: "number" }).notNull().primaryKey(),
  estimate_id: bigint("estimate_id", { mode: "number" }),
  amount: real("amount").default(10.1),
  description: varchar("description", { length: 255 }),
  item: varchar("item", { length: 255 }),
  price: real("price").default(10.1),
  quantity: integer("quantity"),
  rateType: varchar("rate_type", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const estimateLineItemRelationship = relations(lineItems, ({ one }) => ({
  author: one(estimates, {
    fields: [lineItems.estimate_id],
    references: [estimates.id],
  }),
}));
