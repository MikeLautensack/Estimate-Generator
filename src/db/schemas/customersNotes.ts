import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { contractorsCustomers } from "./customers";

export const customersNotes = pgTable("customers_notes", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  customerId: uuid("customer_id").notNull(),
  note: varchar("note", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export type CustomersNotesInsert = typeof customersNotes.$inferInsert;
export type CustomersNotesSelect = typeof customersNotes.$inferSelect;

export interface ICustomersNotes extends CustomersNotesInsert {}
export type PartialCustomersNote = Partial<
  Omit<CustomersNotesInsert, "deletedAt" | "createdAt" | "updatedAt">
> & { id: string };
export interface IPartialCustomersNote extends PartialCustomersNote {}

// Zod schema for inserting a customer - can be used to validate API requests
export const insertCustomersNotesSchema = createInsertSchema(customersNotes);
// Zod schema for selecting a customer - can be used to validate API responses
export const selectCustomersNotesSchema = createSelectSchema(customersNotes);

export const customerNoteRelationship = relations(
  customersNotes,
  ({ one }) => ({
    author: one(contractorsCustomers, {
      fields: [customersNotes.customerId],
      references: [contractorsCustomers.id],
    }),
  }),
);
