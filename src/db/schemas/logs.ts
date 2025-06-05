import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";

export const logs = pgTable("logs", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  logMessage: text("log_message"),
  env: text("env"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
