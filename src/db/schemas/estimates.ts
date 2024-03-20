import { 
  pgTable, 
  varchar,
  bigint,
  timestamp,
  real,
  integer
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { relations } from "drizzle-orm";
import { customers } from "./customers";

export const estimates = pgTable (
    "estimates", 
{
  id: bigint("id", { mode: "number" }).notNull().primaryKey(),
  estimateName: varchar("estimate_name", { length: 255 }),
  customerName: varchar("customer_name", { length: 255 }),
  customerEmail: varchar("customer_email", { length: 255 }),
  projectAddress: varchar("project_address", { length: 255 }),
  contractorName: varchar("contractor_name", { length: 255 }),
  contractorAddress: varchar("contractor_address", { length: 255 }),
  contractorPhone: varchar("contractor_phone", { length: 255 }),
  message: varchar("message", { length: 255 }),
  subtotal: real("subtotal").default(10.10),
  taxRate: real("tax_rate").default(10.10),
  tax: real("tax").default(10.10),
  total: real("total").default(10.10),
  status: varchar("status", { length: 255 }),
  dateCreated: timestamp("date_created", { mode: "date" }).notNull(),
  dateUpdated: timestamp("date_updated", { mode: "date" }).notNull(),
  customer_id: bigint("customer_id", { mode: 'number' }),
  customer_user_id: bigint("customer_user_id", { mode: "number" }),
  contractor_user_id: bigint("contractor_user_id", { mode: "number" })
});

export const userEstimateRelationship = relations(estimates, ({ one }) => ({
  author: one(users, { 
      fields: [estimates.contractor_user_id],
      references: [users.id],
  }),
}));

export const customerObjEstimateRelationship = relations(estimates, ({ one }) => ({
  author: one(customers, { 
      fields: [estimates.customer_id],
      references: [customers.id],
  }),
}));

export const customerUserEstimateRelationship = relations(estimates, ({ one }) => ({
  author: one(users, { 
      fields: [estimates.customer_user_id],
      references: [users.id],
  }),
}));

export const lineItemEstimateRelationship = relations(estimates, ({ many }) => ({
  posts: many(lineItems),
}));

export const lineItems = pgTable (
    "lineItems", 
{
  id: bigint("id", { mode: "number" }).notNull().primaryKey(),
  item: varchar("item", { length: 255 }),
  description: varchar("description", { length: 255 }),
  quantity:  integer ("quantity"),
  rateType: varchar("rate_type", { length: 255 }),
  price: real("price").default(10.10),
  amount: real("amount").default(10.10),
  dateCreated: timestamp("date_created", { mode: "date" }).notNull().defaultNow(),
  dateUpdated: timestamp("date_updated", { mode: "date" }).notNull().defaultNow(),
  estimate_id: bigint("estimate_id", { mode: "number" })
});

export const estimateLineItemRelationship = relations(lineItems, ({ one }) => ({
    author: one(estimates, {
        fields: [lineItems.estimate_id],
        references: [estimates.id],
    }),
}));