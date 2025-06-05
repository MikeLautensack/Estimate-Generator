import {
  pgTable,
  foreignKey,
  pgPolicy,
  uuid,
  text,
  jsonb,
  boolean,
  check,
  bigint,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm/relations";
import { users, usersInAuth } from "./auth";

export const pricingPlanInterval = pgEnum("pricing_plan_interval", [
  "day",
  "week",
  "month",
  "year",
]);
export const pricingType = pgEnum("pricing_type", ["one_time", "recurring"]);
export const subscriptionStatus = pgEnum("subscription_status", [
  "trialing",
  "active",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "unpaid",
]);

export const customers = pgTable(
  "customers",
  {
    id: uuid().primaryKey().notNull(),
    stripeCustomerId: text("stripe_customer_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [users.id],
      name: "customers_id_fkey",
    }),
  ],
);

export const products = pgTable(
  "products",
  {
    id: text().primaryKey().notNull(),
    active: boolean(),
    name: text(),
    description: text(),
    image: text(),
    metadata: jsonb(),
  },
  (table) => [
    pgPolicy("Allow public read-only access.", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ],
);

export const prices = pgTable(
  "prices",
  {
    id: text().primaryKey().notNull(),
    productId: text("product_id"),
    active: boolean(),
    description: text(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    unitAmount: bigint("unit_amount", { mode: "number" }),
    currency: text(),
    type: pricingType(),
    interval: pricingPlanInterval(),
    intervalCount: integer("interval_count"),
    trialPeriodDays: integer("trial_period_days"),
    metadata: jsonb(),
  },
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "prices_product_id_fkey",
    }),
    pgPolicy("Allow public read-only access.", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
    check("prices_currency_check", sql`char_length(currency) = 3`),
  ],
);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: text().primaryKey().notNull(),
    userId: uuid("user_id").notNull(),
    status: subscriptionStatus(),
    metadata: jsonb(),
    priceId: text("price_id"),
    quantity: integer(),
    cancelAtPeriodEnd: boolean("cancel_at_period_end"),
    created: timestamp({ withTimezone: true, mode: "string" })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
    currentPeriodStart: timestamp("current_period_start", {
      withTimezone: true,
      mode: "string",
    })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
    currentPeriodEnd: timestamp("current_period_end", {
      withTimezone: true,
      mode: "string",
    })
      .default(sql`timezone('utc'::text, now())`)
      .notNull(),
    endedAt: timestamp("ended_at", {
      withTimezone: true,
      mode: "string",
    }).default(sql`timezone('utc'::text, now())`),
    cancelAt: timestamp("cancel_at", {
      withTimezone: true,
      mode: "string",
    }).default(sql`timezone('utc'::text, now())`),
    canceledAt: timestamp("canceled_at", {
      withTimezone: true,
      mode: "string",
    }).default(sql`timezone('utc'::text, now())`),
    trialStart: timestamp("trial_start", {
      withTimezone: true,
      mode: "string",
    }).default(sql`timezone('utc'::text, now())`),
    trialEnd: timestamp("trial_end", {
      withTimezone: true,
      mode: "string",
    }).default(sql`timezone('utc'::text, now())`),
  },
  (table) => [
    foreignKey({
      columns: [table.priceId],
      foreignColumns: [prices.id],
      name: "subscriptions_price_id_fkey",
    }),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "subscriptions_user_id_fkey",
    }),
    pgPolicy("Can only view own subs data.", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`(( SELECT auth.uid() AS uid) = user_id)`,
    }),
  ],
);

export const customersRelations = relations(customers, ({ one }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [customers.id],
    references: [usersInAuth.id],
  }),
}));

export const pricesRelations = relations(prices, ({ one, many }) => ({
  product: one(products, {
    fields: [prices.productId],
    references: [products.id],
  }),
  subscriptions: many(subscriptions),
}));

export const productsRelations = relations(products, ({ many }) => ({
  prices: many(prices),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  price: one(prices, {
    fields: [subscriptions.priceId],
    references: [prices.id],
  }),
  usersInAuth: one(usersInAuth, {
    fields: [subscriptions.userId],
    references: [usersInAuth.id],
  }),
}));
