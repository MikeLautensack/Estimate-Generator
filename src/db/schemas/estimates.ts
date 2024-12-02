import {
  pgTable,
  varchar,
  bigint,
  timestamp,
  real,
  integer,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { relations } from "drizzle-orm";
import { customers } from "./customers";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const estimates = pgTable("estimates", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  contractor_user_id: uuid("contractor_user_id"),
  customer_id: uuid("customer_id"),
  customer_user_id: uuid("customer_user_id"),
  contractorAddress: varchar("contractor_address", { length: 255 }),
  contractorAddress2: varchar("contractor_address2", { length: 255 }),
  contractorCity: varchar("contractor_city", { length: 255 }),
  contractorState: varchar("contractor_state", { length: 255 }),
  contractorZip: varchar("contractor_zip", { length: 255 }),
  contractorName: varchar("contractor_name", { length: 255 }),
  contractorPhone: varchar("contractor_phone", { length: 255 }),
  customerEmail: varchar("customer_email", { length: 255 }),
  customerFirstName: varchar("customer_first_name", { length: 255 }),
  customerLastName: varchar("customer_last_name", { length: 255 }),
  estimateName: varchar("estimate_name", { length: 255 }),
  expirationDate: timestamp("expiration_date").notNull(),
  message: varchar("message", { length: 255 }),
  projectAddress: varchar("project_address", { length: 255 }),
  projectAddress2: varchar("project_address2", { length: 255 }),
  projectCity: varchar("project_city", { length: 255 }),
  projectState: varchar("project_state", { length: 255 }),
  projectZip: varchar("project_zip", { length: 255 }),
  status: varchar("status", { length: 255 }),
  subtotal: real("subtotal").default(10.1),
  tax: real("tax").default(10.1),
  taxMode: varchar("tax_mode", { length: 255 }),
  taxRate: real("tax_rate").default(10.1),
  total: real("total").default(10.1),
  discountMode: varchar("discount_mode", { length: 255 }),
  discountPercentage: real("discount_percentage").default(10.1),
  discount: real("discount").default(10.1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export type EstimatesInsert = typeof estimates.$inferInsert;
export type EstimatesSelect = typeof estimates.$inferSelect;

// Zod schema for inserting a estimate - can be used to validate API requests
export const insertEstimateSchema = createInsertSchema(estimates);
// Zod schema for selecting a estimate - can be used to validate API responses
export const selectEstimateSchema = createSelectSchema(estimates);

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
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  estimate_id: uuid("estimate_id"),
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

export type LineItemsInsert = typeof lineItems.$inferInsert;
export type LineItemsSelect = typeof lineItems.$inferSelect;

// Zod schema for inserting a estimate - can be used to validate API requests
export const insertLineItemsSchema = createInsertSchema(lineItems);
// Zod schema for selecting a estimate - can be used to validate API responses
export const selectLineItemsSchema = createSelectSchema(lineItems);

export const estimateLineItemRelationship = relations(lineItems, ({ one }) => ({
  author: one(estimates, {
    fields: [lineItems.estimate_id],
    references: [estimates.id],
  }),
}));
