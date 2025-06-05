import {
  pgTable,
  bigint,
  timestamp,
  uuid,
  foreignKey,
} from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export const invoices = pgTable(
  "invoices",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    job_id: uuid("job_id").notNull(),
    price: bigint("price", { mode: "number" }).notNull(),
    tax: bigint("price", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    foreignKey({
      columns: [table.job_id],
      foreignColumns: [jobs.id],
      name: "invoices_job_id_fkey",
    }),
  ],
);
