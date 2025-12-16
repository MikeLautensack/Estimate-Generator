import { pgTable, foreignKey, pgPolicy, uuid, text, jsonb, timestamp, varchar, numeric, date, boolean, integer, check, bigint, real, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const pricingPlanInterval = pgEnum("pricing_plan_interval", ['day', 'week', 'month', 'year'])
export const pricingType = pgEnum("pricing_type", ['one_time', 'recurring'])
export const subscriptionStatus = pgEnum("subscription_status", ['trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid'])
export const userRole = pgEnum("user_role", ['contractor', 'customer', 'admin'])


export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	fullName: text("full_name"),
	avatarUrl: text("avatar_url"),
	billingAddress: jsonb("billing_address"),
	paymentMethod: jsonb("payment_method"),
	role: userRole().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.id],
			foreignColumns: [table.id],
			name: "users_id_fkey"
		}),
	pgPolicy("Can view own user data.", { as: "permissive", for: "select", to: ["public"] }),
	pgPolicy("Can update own user data.", { as: "permissive", for: "update", to: ["public"] }),
]);

export const jobs = pgTable("jobs", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	contractorUserId: uuid("contractor_user_id").notNull(),
	customerUserId: uuid("customer_user_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	status: varchar({ length: 32 }).default('draft').notNull(),
	estimateAmount: numeric("estimate_amount", { precision: 12, scale:  2 }),
	actualAmount: numeric("actual_amount", { precision: 12, scale:  2 }),
	currency: varchar({ length: 3 }).default('USD'),
	startDate: date("start_date"),
	endDate: date("end_date"),
	address: varchar({ length: 255 }),
	customerId: uuid("customer_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.contractorUserId],
			foreignColumns: [users.id],
			name: "jobs_contractor_user_id_fkey"
		}),
	foreignKey({
			columns: [table.customerUserId],
			foreignColumns: [users.id],
			name: "jobs_customer_user_id_fkey"
		}),
	pgPolicy("Contractors can delete their own jobs", { as: "permissive", for: "delete", to: ["public"] }),
	pgPolicy("Contractors can update their own jobs", { as: "permissive", for: "update", to: ["public"] }),
	pgPolicy("Contractors can insert jobs", { as: "permissive", for: "insert", to: ["public"] }),
	pgPolicy("Users can view their own jobs", { as: "permissive", for: "select", to: ["public"] }),
	pgPolicy("Enable RLS", { as: "permissive", for: "all", to: ["public"] }),
]);

export const logs = pgTable("logs", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	logMessage: text("log_message"),
	env: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const contractorsCustomers = pgTable("contractors_customers", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	contractorUserId: uuid("contractor_user_id").notNull(),
	customerUserId: uuid("customer_user_id").notNull(),
	address: varchar({ length: 255 }).notNull(),
	address2: varchar({ length: 255 }).notNull(),
	city: varchar({ length: 255 }).notNull(),
	state: varchar({ length: 255 }).notNull(),
	zip: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	lastName: varchar("last_name", { length: 255 }).notNull(),
	phone: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.contractorUserId],
			foreignColumns: [users.id],
			name: "contractors_customers_contractor_user_id_fkey"
		}),
	foreignKey({
			columns: [table.customerUserId],
			foreignColumns: [users.id],
			name: "contractors_customers_customer_user_id_fkey"
		}),
]);

export const products = pgTable("products", {
	id: text().primaryKey().notNull(),
	active: boolean(),
	name: text(),
	description: text(),
	image: text(),
	metadata: jsonb(),
}, (table) => [
	pgPolicy("Allow public read-only access.", { as: "permissive", for: "select", to: ["public"] }),
]);

export const subscriptions = pgTable("subscriptions", {
	id: text().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	status: subscriptionStatus(),
	metadata: jsonb(),
	priceId: text("price_id"),
	quantity: integer(),
	cancelAtPeriodEnd: boolean("cancel_at_period_end"),
	created: timestamp({ withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
	currentPeriodStart: timestamp("current_period_start", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
	currentPeriodEnd: timestamp("current_period_end", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
	endedAt: timestamp("ended_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
	cancelAt: timestamp("cancel_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
	canceledAt: timestamp("canceled_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
	trialStart: timestamp("trial_start", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
	trialEnd: timestamp("trial_end", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
}, (table) => [
	foreignKey({
			columns: [table.priceId],
			foreignColumns: [prices.id],
			name: "subscriptions_price_id_fkey"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "subscriptions_user_id_fkey"
		}),
	pgPolicy("Can only view own subs data.", { as: "permissive", for: "select", to: ["public"] }),
]);

export const profiles = pgTable("profiles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	profileImgKey: varchar("profile_img_key", { length: 255 }),
	profileImgUrl: varchar("profile_img_url", { length: 255 }),
	businessAddress: varchar("business_address", { length: 255 }).notNull(),
	businessAddress2: varchar("business_address2", { length: 255 }).notNull(),
	businessCity: varchar("business_city", { length: 255 }).notNull(),
	businessState: varchar("business_state", { length: 255 }).notNull(),
	businessZip: varchar("business_zip", { length: 255 }).notNull(),
	businessEmail: varchar("business_email", { length: 255 }).notNull(),
	businessName: varchar("business_name", { length: 255 }).notNull(),
	businessPhone: varchar("business_phone", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "profiles_user_id_fkey"
		}),
]);

export const workOrders = pgTable("work_orders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	jobId: uuid("job_id").notNull(),
	orderName: varchar("order_name", { length: 255 }).notNull(),
	workAddress: varchar("work_address", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.jobId],
			foreignColumns: [jobs.id],
			name: "work_orders_job_id_fkey"
		}),
]);

export const prices = pgTable("prices", {
	id: text().primaryKey().notNull(),
	productId: text("product_id"),
	active: boolean(),
	description: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	unitAmount: bigint("unit_amount", { mode: "number" }),
	currency: text(),
	type: pricingType(),
	interval: pricingPlanInterval(),
	intervalCount: integer("interval_count"),
	trialPeriodDays: integer("trial_period_days"),
	metadata: jsonb(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "prices_product_id_fkey"
		}),
	pgPolicy("Allow public read-only access.", { as: "permissive", for: "select", to: ["public"] }),
	check("prices_currency_check", sql`char_length(currency) = 3`),
]);

export const changeOrders = pgTable("change_orders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	jobId: uuid("job_id").notNull(),
	changeOrderName: varchar("change_order_name", { length: 255 }),
	customerName: varchar("customer_name", { length: 255 }),
	description: varchar({ length: 255 }),
	estimateName: varchar("estimate_name", { length: 255 }),
	projectAddress: varchar("project_address", { length: 255 }),
	status: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.jobId],
			foreignColumns: [jobs.id],
			name: "change_orders_job_id_fkey"
		}),
]);

export const invoices = pgTable("invoices", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	jobId: uuid("job_id").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	price: bigint({ mode: "number" }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.jobId],
			foreignColumns: [jobs.id],
			name: "invoices_job_id_fkey"
		}),
]);

export const lineItems = pgTable("lineItems", {
	id: uuid().primaryKey().notNull(),
	estimateId: uuid("estimate_id").notNull(),
	amount: real().default(10.1),
	description: varchar({ length: 255 }),
	item: varchar({ length: 255 }),
	price: real().default(10.1),
	quantity: integer(),
	rateType: varchar("rate_type", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.estimateId],
			foreignColumns: [estimates.id],
			name: "estimates_id_fkey"
		}),
]);

export const stripeCustomers = pgTable("stripe_customers", {
	id: uuid().primaryKey().notNull(),
	stripeCustomerId: text("stripe_customer_id"),
}, (table) => [
	foreignKey({
			columns: [table.id],
			foreignColumns: [users.id],
			name: "customers_id_fkey"
		}),
]);

export const estimates = pgTable("estimates", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	jobId: uuid("job_id").notNull(),
	contractorAddress: varchar("contractor_address", { length: 255 }),
	contractorAddress2: varchar("contractor_address2", { length: 255 }),
	contractorCity: varchar("contractor_city", { length: 255 }),
	contractorState: varchar("contractor_state", { length: 255 }),
	contractorZip: varchar("contractor_zip", { length: 255 }),
	contractorName: varchar("contractor_name", { length: 255 }),
	contractorPhone: varchar("contractor_phone", { length: 255 }),
	customerEmail: varchar("customer_email", { length: 255 }),
	customerFirstName: varchar("customer_first_name", { length: 255 }),
	customerLastName: varchar("customer_last_name", { length: 255 }),
	estimateName: varchar("estimate_name", { length: 255 }),
	expirationDate: timestamp("expiration_date", { mode: 'string' }).notNull(),
	message: varchar({ length: 255 }),
	projectAddress: varchar("project_address", { length: 255 }),
	projectAddress2: varchar("project_address2", { length: 255 }),
	projectCity: varchar("project_city", { length: 255 }),
	projectState: varchar("project_state", { length: 255 }),
	projectZip: varchar("project_zip", { length: 255 }),
	status: varchar({ length: 255 }),
	subtotal: real().default(10.1),
	tax: real().default(10.1),
	taxMode: varchar("tax_mode", { length: 255 }),
	taxRate: real("tax_rate").default(10.1),
	total: real().default(10.1),
	discountMode: varchar("discount_mode", { length: 255 }),
	discountPercentage: real("discount_percentage").default(10.1),
	discount: real().default(10.1),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	estimateNumber: varchar("estimate_number", { length: 255 }).notNull(),
	totalAmount: numeric("total_amount", { precision: 10, scale:  2 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.jobId],
			foreignColumns: [jobs.id],
			name: "estimates_job_id_fkey"
		}),
	pgPolicy("Contractors can delete estimates for their jobs", { as: "permissive", for: "delete", to: ["public"] }),
	pgPolicy("Contractors can update estimates for their jobs", { as: "permissive", for: "update", to: ["public"] }),
	pgPolicy("Contractors can insert estimates for their jobs", { as: "permissive", for: "insert", to: ["public"] }),
	pgPolicy("Users can view estimates for their jobs", { as: "permissive", for: "select", to: ["public"] }),
	pgPolicy("Enable RLS", { as: "permissive", for: "all", to: ["public"] }),
]);
