import {
  pgTable,
  varchar,
  timestamp,
  foreignKey,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./auth";

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    user_id: uuid("user_id").notNull(),
    profileImgKey: varchar("profile_img_key", { length: 255 }),
    profileImgUrl: varchar("profile_img_url", { length: 255 }),
    businessAddress: varchar("business_address", { length: 255 }).notNull(),
    businessAddress2: varchar("business_address2", { length: 255 }).notNull(),
    businessCity: varchar("business_city", { length: 255 }).notNull(),
    businessState: varchar("business_state", { length: 255 }).notNull(),
    businessZip: varchar("business_zip", { length: 255 }).notNull(),
    businessEmail: varchar("business_email", { length: 255 }).notNull(),
    businessName: varchar("business_name", { length: 255 }).notNull(),
    businessPhone: varchar("business_phone", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    foreignKey({
      columns: [table.user_id],
      foreignColumns: [users.id],
      name: "profiles_user_id_fkey",
    }),
  ],
);

export type ProfileInsert = typeof profiles.$inferInsert;
export type ProfileSelect = typeof profiles.$inferSelect;

// Zod schema for inserting a estimate - can be used to validate API requests
export const insertProfilesSchema = createInsertSchema(profiles);
// Zod schema for selecting a estimate - can be used to validate API responses
export const selectProfilesSchema = createSelectSchema(profiles);
