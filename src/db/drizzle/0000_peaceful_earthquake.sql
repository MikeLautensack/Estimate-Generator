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
	"new_user" boolean NOT NULL,
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
	"contractor_user_id" bigint,
	"customer_user_id" bigint,
	"estimate_id" bigint,
	"change_order_name" varchar(255),
	"customer_name" varchar(255),
	"description" varchar(255),
	"estimate_name" varchar(255),
	"project_address" varchar(255),
	"status" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" bigint PRIMARY KEY NOT NULL,
	"contractor_user_id" bigint NOT NULL,
	"customer_user_id" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "estimates" (
	"id" bigint PRIMARY KEY NOT NULL,
	"contractor_user_id" bigint,
	"customer_id" bigint,
	"customer_user_id" bigint,
	"contractor_address" varchar(255),
	"contractor_name" varchar(255),
	"contractor_phone" varchar(255),
	"customer_email" varchar(255),
	"customer_name" varchar(255),
	"estimate_name" varchar(255),
	"message" varchar(255),
	"project_address" varchar(255),
	"status" varchar(255),
	"subtotal" real DEFAULT 10.1,
	"tax" real DEFAULT 10.1,
	"tax_rate" real DEFAULT 10.1,
	"total" real DEFAULT 10.1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lineItems" (
	"id" bigint PRIMARY KEY NOT NULL,
	"estimate_id" bigint,
	"amount" real DEFAULT 10.1,
	"description" varchar(255),
	"item" varchar(255),
	"price" real DEFAULT 10.1,
	"quantity" integer,
	"rate_type" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" bigint PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"price" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" bigint PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"business_address" varchar(255) NOT NULL,
	"business_email" varchar(255) NOT NULL,
	"business_name" varchar(255) NOT NULL,
	"business_phone" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workOrders" (
	"id" bigint PRIMARY KEY NOT NULL,
	"contractor_user_id" bigint NOT NULL,
	"customer_user_id" varchar(255) NOT NULL,
	"order_name" varchar(255) NOT NULL,
	"work_address" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
