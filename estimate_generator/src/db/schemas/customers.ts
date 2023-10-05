import {
  mysqlTable,
  varchar,
  bigint,
} from "drizzle-orm/mysql-core"
import { users } from './auth'
import { relations } from 'drizzle-orm'

export const customers = mysqlTable(
    "customers", 
{
  id: bigint('id', { mode: 'number' }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  address: varchar('address', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 255 }),
  user_id: bigint('user_id', { mode: 'number' })
})

export const postsRelations = relations(customers, ({ one }) => ({
	author: one(users, {
		fields: [customers.user_id],
		references: [users.id],
	}),
}))