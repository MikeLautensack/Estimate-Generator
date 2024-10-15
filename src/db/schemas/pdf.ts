import { pgTable, timestamp, text, bigint } from "drizzle-orm/pg-core";

export const pdfs = pgTable("pdfs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  contractor_id: text("contractor_id"),
  customer_id: text("customer_id"),
  estimate_id: bigint("estimate_id", { mode: "number" }).notNull(),
  fileKey: text("file_key"),
  fileUrl: text("file_url"),
  fileSize: text("file_size"),
  fileName: text("file_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
