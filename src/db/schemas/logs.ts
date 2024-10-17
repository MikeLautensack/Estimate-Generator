import { pgTable, timestamp, text } from "drizzle-orm/pg-core";

export const logs = pgTable("logs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  logMessage: text("log_message"),
  env: text("env"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
