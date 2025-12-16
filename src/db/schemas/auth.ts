import {
  pgPolicy,
  pgTable,
  pgSchema,
  uuid,
  text,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export type UserRole = "contractor" | "customer" | "admin";

export const userRoleEnum = pgEnum("user_role", [
  "contractor",
  "customer",
  "admin",
]);

export const auth = pgSchema("auth");

export const usersInAuth = auth.table("users", {
  id: uuid().notNull(),
});

export const users = pgTable(
  "users",
  {
    id: uuid()
      .defaultRandom()
      .primaryKey()
      .notNull()
      .references(() => usersInAuth.id, {
        onDelete: "cascade",
      }),
    email: text("email"),
    fullName: text("full_name"),
    avatarUrl: text("avatar_url"),
    billingAddress: jsonb("billing_address"),
    paymentMethod: jsonb("payment_method"),
    role: userRoleEnum("role").notNull().default("contractor"),
  },
  (table) => [
    pgPolicy("Can update own user data.", {
      as: "permissive",
      for: "update",
      to: ["public"],
      using: sql`(( SELECT auth.uid() AS uid) = id)`,
    }),
    pgPolicy("Can view own user data.", {
      as: "permissive",
      for: "select",
      to: ["public"],
    }),
  ],
);
