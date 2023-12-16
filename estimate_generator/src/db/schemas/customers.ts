import {
  mysqlTable,
  varchar,
  bigint,
  timestamp,
} from "drizzle-orm/mysql-core"
import { users } from './auth'
import { relations } from 'drizzle-orm'
import { estimates } from "./estimates"

export const customers = mysqlTable(
    "customers", 
{
  id: bigint('id', { mode: 'number' }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  address: varchar('address', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 255 }),
  dateCreated: timestamp("date_created", { mode: "date" }).notNull(),
  dateUpdated: timestamp("date_updated", { mode: "date" }).notNull(),
  contractor_user_id: bigint('contractor_user_id', { mode: 'number' }),
  customer_user_id: varchar("customer_user_id", { length: 255 })
})

export const customerContractorRelationship = relations(customers, ({ one }) => ({
	author: one(users, {
		fields: [customers.contractor_user_id],
		references: [users.id],
	}),
}))

export const customerCustomerRelationship = relations(customers, ({ one }) => ({
	author: one(users, {
		fields: [customers.customer_user_id],
		references: [users.id],
	}),
}))

export const userEstimateRelationship = relations(customers, ({ many }) => ({
	posts: many(estimates),
}))