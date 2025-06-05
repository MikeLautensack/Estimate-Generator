import {
  pgTable,
  varchar,
  timestamp,
  foreignKey,
  uuid,
  pgPolicy,
  numeric,
  text,
  date,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./auth";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const jobs = pgTable(
  "jobs",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    contractor_user_id: uuid("contractor_user_id").notNull(),
    customer_user_id: uuid("customer_user_id").notNull(),
    name: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    status: varchar("status", { length: 32 }).notNull().default("draft"),
    estimate_amount: numeric("estimate_amount", { precision: 12, scale: 2 }),
    actual_amount: numeric("actual_amount", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 3 }).default("USD"),
    start_date: date("start_date"),
    end_date: date("end_date"),
    address: varchar("address", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    foreignKey({
      columns: [table.contractor_user_id],
      foreignColumns: [users.id],
      name: "jobs_contractor_user_id_fkey",
    }),
    foreignKey({
      columns: [table.customer_user_id],
      foreignColumns: [users.id],
      name: "jobs_customer_user_id_fkey",
    }),
    pgPolicy("Enable RLS", {
      using: sql`true`,
    }),
    pgPolicy("Users can view their own jobs", {
      for: "select",
      to: ["public"],
      using: sql`auth.uid() = contractor_user_id OR auth.uid() = customer_user_id`,
    }),
    pgPolicy("Contractors can insert jobs", {
      for: "insert",
      to: ["public"],
      using: sql`auth.uid() = contractor_user_id`,
    }),
    pgPolicy("Contractors can update their own jobs", {
      for: "update",
      to: ["public"],
      using: sql`auth.uid() = contractor_user_id`,
    }),
    pgPolicy("Contractors can delete their own jobs", {
      for: "delete",
      to: ["public"],
      using: sql`auth.uid() = contractor_user_id`,
    }),
  ],
);

export type JobsInsert = typeof jobs.$inferInsert;
export type JobsSelect = typeof jobs.$inferSelect;

// Zod schema for inserting a customer - can be used to validate API requests
export const insertCustomerSchema = createInsertSchema(jobs);
// Zod schema for selecting a customer - can be used to validate API responses
export const selectCustomerSchema = createSelectSchema(jobs);
