import { relations } from "drizzle-orm"
import {
  mysqlTable,
  varchar,
  bigint,
} from "drizzle-orm/mysql-core"
import { users } from "./auth"

export const changeOrders = mysqlTable(
    "changeOrders", 
{
  id: bigint('id', { mode: 'number' }).notNull().primaryKey(),
  estimateName: varchar('estimate_name', { length: 255 }),
  description: varchar('description', { length: 255 }),
  customerName: varchar('customer_name', { length: 255 }),
  workAddress: varchar('work_address', { length: 255 }),
  status: varchar('status', { length: 255 }),
  user_id: bigint('user_id', { mode: 'number' })
})

export const userCustomerRelationship = relations(changeOrders, ({ one }) => ({
	author: one(users, {
		fields: [changeOrders.user_id],
		references: [users.id],
	}),
}))