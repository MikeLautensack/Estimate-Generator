import { mysqlTable, varchar, bigint, decimal, int } from "drizzle-orm/mysql-core"
import { users } from './auth'
import { relations } from 'drizzle-orm'
import { customers } from "./customers"
  
  export const estimates = mysqlTable(
      "estimates", 
  {
    id: bigint('id', { mode: 'number' }).notNull().primaryKey(),
    estimateName: varchar('estimate_name', { length: 255 }),
    customerName: varchar('customer_name', { length: 255 }),
    customerEmail: varchar('customer_email', { length: 255 }),
    projectAddress: varchar('project_address', { length: 255 }),
    contractorName: varchar('contractor_name', { length: 255 }),
    contractorAddress: varchar('contractor_address', { length: 255 }),
    contractorPhone: varchar('contractor_phone', { length: 255 }),
    massage: varchar('massage', { length: 255 }),
    subtotal: decimal('subtotal', { precision: 14, scale: 2,}),
    taxRate: decimal('tax_rate', { precision: 2, scale: 2,}),
    tax: decimal('tax', { precision: 14, scale: 2,}),
    total: decimal('total', { precision: 14, scale: 2,}),
    customer_id: bigint('customer_id', { mode: 'number' }),
    user_id: bigint('user_id', { mode: 'number' })
  })

  export const userEstimateRelationship = relations(estimates, ({ one }) => ({
    author: one(users, { 
        fields: [estimates.user_id],
        references: [users.id],
    }),
  }))

  export const customerEstimateRelationship = relations(estimates, ({ one }) => ({
    author: one(customers, { 
        fields: [estimates.customer_id],
        references: [customers.id],
    }),
  }))

  export const lineItemEstimateRelationship = relations(estimates, ({ many }) => ({
	posts: many(lineItems),
}))

  export const lineItems = mysqlTable(
      "lineItems", 
  {
    id: bigint('id', { mode: 'number' }).notNull().primaryKey(),
    item: varchar('item', { length: 255 }),
    description: varchar('description', { length: 255 }),
    quantity:  int('quantity'),
    rateType: varchar('rate_type', { length: 255 }),
    price: varchar('price', { length: 255 }),
    amount: decimal('amount', { precision: 14, scale: 2,}),
    estimate_id: bigint('estimate_id', { mode: 'number' })
  })

  export const estimateLineItemRelationship = relations(lineItems, ({ one }) => ({
      author: one(estimates, {
          fields: [lineItems.estimate_id],
          references: [estimates.id],
      }),
  }))