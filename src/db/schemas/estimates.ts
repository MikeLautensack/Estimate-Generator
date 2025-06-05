import {
  pgTable,
  varchar,
  timestamp,
  real,
  integer,
  uuid,
  foreignKey,
  decimal,
  pgPolicy,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { jobs } from "./jobs";

export const estimates = pgTable(
  "estimates",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    job_id: uuid("job_id").notNull(),
    estimateNumber: varchar("estimate_number", { length: 255 }).notNull(),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
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
  },
  (table) => [
    foreignKey({
      columns: [table.job_id],
      foreignColumns: [jobs.id],
      name: "estimates_job_id_fkey",
    }),
    pgPolicy("Enable RLS", {
      using: sql`true`,
    }),
    pgPolicy("Users can view estimates for their jobs", {
      for: "select",
      to: ["public"],
      using: sql`EXISTS (
        SELECT 1 FROM jobs 
        WHERE jobs.id = job_id 
        AND (
          auth.uid() = jobs.contractor_user_id 
          OR auth.uid() = jobs.customer_user_id
        )
      )`,
    }),
    pgPolicy("Contractors can insert estimates for their jobs", {
      for: "insert",
      to: ["public"],
      using: sql`EXISTS (
        SELECT 1 FROM jobs 
        WHERE jobs.id = job_id 
        AND auth.uid() = jobs.contractor_user_id
      )`,
    }),
    pgPolicy("Contractors can update estimates for their jobs", {
      for: "update",
      to: ["public"],
      using: sql`EXISTS (
        SELECT 1 FROM jobs 
        WHERE jobs.id = job_id 
        AND auth.uid() = jobs.contractor_user_id
      )`,
    }),
    pgPolicy("Contractors can delete estimates for their jobs", {
      for: "delete",
      to: ["public"],
      using: sql`EXISTS (
        SELECT 1 FROM jobs 
        WHERE jobs.id = job_id 
        AND auth.uid() = jobs.contractor_user_id
      )`,
    }),
  ],
);

export type EstimatesInsert = typeof estimates.$inferInsert;
export type EstimatesSelect = typeof estimates.$inferSelect;

// Zod schema for inserting a estimate - can be used to validate API requests
export const insertEstimateSchema = createInsertSchema(estimates);
// Zod schema for selecting a estimate - can be used to validate API responses
export const selectEstimateSchema = createSelectSchema(estimates);

export const lineItemEstimateRelationship = relations(
  estimates,
  ({ many }) => ({
    posts: many(lineItems),
  }),
);

export const lineItems = pgTable(
  "lineItems",
  {
    id: uuid("id").notNull().primaryKey(),
    estimate_id: uuid("estimate_id").notNull(),
    amount: real("amount").default(10.1),
    description: varchar("description", { length: 255 }),
    item: varchar("item", { length: 255 }),
    price: real("price").default(10.1),
    quantity: integer("quantity"),
    rateType: varchar("rate_type", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    foreignKey({
      columns: [table.estimate_id],
      foreignColumns: [estimates.id],
      name: "estimates_id_fkey",
    }),
  ],
);

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
