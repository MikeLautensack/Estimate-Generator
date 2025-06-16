import { relations } from "drizzle-orm/relations";
import { usersInAuth, users, jobs, contractorsCustomers, prices, subscriptions, profiles, workOrders, products, changeOrders, invoices, estimates, lineItems, stripeCustomers } from "./schema";

export const usersRelations = relations(users, ({one, many}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [users.id],
		references: [usersInAuth.id]
	}),
	jobs_contractorUserId: many(jobs, {
		relationName: "jobs_contractorUserId_users_id"
	}),
	jobs_customerUserId: many(jobs, {
		relationName: "jobs_customerUserId_users_id"
	}),
	contractorsCustomers_contractorUserId: many(contractorsCustomers, {
		relationName: "contractorsCustomers_contractorUserId_users_id"
	}),
	contractorsCustomers_customerUserId: many(contractorsCustomers, {
		relationName: "contractorsCustomers_customerUserId_users_id"
	}),
	subscriptions: many(subscriptions),
	profiles: many(profiles),
	stripeCustomers: many(stripeCustomers),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	users: many(users),
}));

export const jobsRelations = relations(jobs, ({one, many}) => ({
	user_contractorUserId: one(users, {
		fields: [jobs.contractorUserId],
		references: [users.id],
		relationName: "jobs_contractorUserId_users_id"
	}),
	user_customerUserId: one(users, {
		fields: [jobs.customerUserId],
		references: [users.id],
		relationName: "jobs_customerUserId_users_id"
	}),
	workOrders: many(workOrders),
	changeOrders: many(changeOrders),
	invoices: many(invoices),
	estimates: many(estimates),
}));

export const contractorsCustomersRelations = relations(contractorsCustomers, ({one}) => ({
	user_contractorUserId: one(users, {
		fields: [contractorsCustomers.contractorUserId],
		references: [users.id],
		relationName: "contractorsCustomers_contractorUserId_users_id"
	}),
	user_customerUserId: one(users, {
		fields: [contractorsCustomers.customerUserId],
		references: [users.id],
		relationName: "contractorsCustomers_customerUserId_users_id"
	}),
}));

export const subscriptionsRelations = relations(subscriptions, ({one}) => ({
	price: one(prices, {
		fields: [subscriptions.priceId],
		references: [prices.id]
	}),
	user: one(users, {
		fields: [subscriptions.userId],
		references: [users.id]
	}),
}));

export const pricesRelations = relations(prices, ({one, many}) => ({
	subscriptions: many(subscriptions),
	product: one(products, {
		fields: [prices.productId],
		references: [products.id]
	}),
}));

export const profilesRelations = relations(profiles, ({one}) => ({
	user: one(users, {
		fields: [profiles.userId],
		references: [users.id]
	}),
}));

export const workOrdersRelations = relations(workOrders, ({one}) => ({
	job: one(jobs, {
		fields: [workOrders.jobId],
		references: [jobs.id]
	}),
}));

export const productsRelations = relations(products, ({many}) => ({
	prices: many(prices),
}));

export const changeOrdersRelations = relations(changeOrders, ({one}) => ({
	job: one(jobs, {
		fields: [changeOrders.jobId],
		references: [jobs.id]
	}),
}));

export const invoicesRelations = relations(invoices, ({one}) => ({
	job: one(jobs, {
		fields: [invoices.jobId],
		references: [jobs.id]
	}),
}));

export const lineItemsRelations = relations(lineItems, ({one}) => ({
	estimate: one(estimates, {
		fields: [lineItems.estimateId],
		references: [estimates.id]
	}),
}));

export const estimatesRelations = relations(estimates, ({one, many}) => ({
	lineItems: many(lineItems),
	job: one(jobs, {
		fields: [estimates.jobId],
		references: [jobs.id]
	}),
}));

export const stripeCustomersRelations = relations(stripeCustomers, ({one}) => ({
	user: one(users, {
		fields: [stripeCustomers.id],
		references: [users.id]
	}),
}));