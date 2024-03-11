CREATE TABLE IF NOT EXISTS "accounts" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" varchar(255),
	"refresh_token_expires_in" integer,
	"access_token" varchar(255),
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" text,
	CONSTRAINT accounts_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"role" varchar(255),
	"emailVerified" timestamp,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "changeOrders" (
	"id" bigint PRIMARY KEY NOT NULL,
	"estimate_name" varchar(255),
	"change_order_name" varchar(255),
	"description" varchar(255),
	"customer_name" varchar(255),
	"project_address" varchar(255),
	"status" varchar(255),
	"date_created" timestamp NOT NULL,
	"date_updated" timestamp NOT NULL,
	"estimate_id" bigint,
	"contractor_user_id" bigint,
	"customer_user_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"address" varchar(255),
	"email" varchar(255),
	"phone" varchar(255),
	"date_created" timestamp NOT NULL,
	"date_updated" timestamp NOT NULL,
	"contractor_user_id" bigint,
	"customer_user_id" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "estimates" (
	"id" bigint PRIMARY KEY NOT NULL,
	"estimate_name" varchar(255),
	"customer_name" varchar(255),
	"customer_email" varchar(255),
	"project_address" varchar(255),
	"contractor_name" varchar(255),
	"contractor_address" varchar(255),
	"contractor_phone" varchar(255),
	"message" varchar(255),
	"subtotal" numeric(14, 2),
	"tax_rate" numeric(2, 2),
	"tax" numeric(14, 2),
	"total" numeric(14, 2),
	"status" varchar(255),
	"date_created" timestamp NOT NULL,
	"date_updated" timestamp NOT NULL,
	"customer_id" bigint,
	"customer_user_id" bigint,
	"contractor_user_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lineItems" (
	"id" bigint PRIMARY KEY NOT NULL,
	"item" varchar(255),
	"description" varchar(255),
	"quantity" integer,
	"rate_type" varchar(255),
	"price" varchar(255),
	"amount" numeric(14, 2),
	"date_created" timestamp DEFAULT now() NOT NULL,
	"date_updated" timestamp DEFAULT now() NOT NULL,
	"estimate_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" bigint PRIMARY KEY NOT NULL,
	"business_name" varchar(255),
	"business_address" varchar(255),
	"business_email" varchar(255),
	"business_phone" varchar(255),
	"date_created" timestamp NOT NULL,
	"date_updated" timestamp NOT NULL,
	"user_id" bigint
);
