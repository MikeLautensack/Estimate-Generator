import {
  pgTable,
  varchar,
  timestamp,
  foreignKey,
  uuid,
} from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export const workOrders = pgTable(
  "work_orders",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    job_id: uuid("job_id").notNull(),
    orderName: varchar("order_name", { length: 255 }).notNull(),
    workAddress: varchar("work_address", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    foreignKey({
      columns: [table.job_id],
      foreignColumns: [jobs.id],
      name: "work_orders_job_id_fkey",
    }),
  ],
);
