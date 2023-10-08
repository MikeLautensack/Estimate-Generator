import {
    mysqlTable,
    varchar,
    bigint,
    decimal,
    int
  } from "drizzle-orm/mysql-core"
  import { users } from './auth'
  import { relations } from 'drizzle-orm'
  
  export const estimates = mysqlTable(
      "estimates", 
  {
    id: bigint('id', { mode: 'number' }).notNull().primaryKey(),
    estimate_name: varchar('estimateName', { length: 255 }),
    customer_name: varchar('customerName', { length: 255 }),
    customer_business_name: varchar('customerBusinessName', { length: 255 }),
    project_address: varchar('projectAddress', { length: 255 }),
    contractor_name: varchar('contractorName', { length: 255 }),
    contractor_address: varchar('contractorAddress', { length: 255 }),
    contractor_phone: varchar('contractorPhone', { length: 255 }),
    massage: varchar('massage', { length: 255 }),
    subtotal: decimal('subtotal', { precision: 14, scale: 2,}),
    tax: decimal('tax', { precision: 14, scale: 2,}),
    total: decimal('total', { precision: 14, scale: 2,}),
    user_id: bigint('user_id', { mode: 'number' })
  })

  export const userEstimateRelationship = relations(estimates, ({ one }) => ({
    author: one(users, {
        fields: [estimates.user_id],
        references: [users.id],
    }),
  }))

  export const lineItemEstimateRelationship = relations(estimates, ({ many }) => ({
	posts: many(lineItems),
}))

  export const lineItems = mysqlTable(
      "lineItems", 
  {
    id: bigint('id', { mode: 'number' }).notNull().primaryKey(),
    description: varchar('description', { length: 255 }),
    quantity:  int('quantity'),
    rate_type: varchar('rate_type', { length: 255 }),
    unit_type: varchar('unit_type', { length: 255 }),
    unit_rate: decimal('unit_rate', { precision: 14, scale: 2,}),
    total: decimal('total', { precision: 14, scale: 2,}),
    estimate_id: bigint('estimate_id', { mode: 'number' })
  })

  export const estimateLineItemRelationship = relations(lineItems, ({ one }) => ({
      author: one(estimates, {
          fields: [lineItems.estimate_id],
          references: [estimates.id],
      }),
  }))