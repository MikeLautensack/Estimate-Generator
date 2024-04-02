CREATE TABLE IF NOT EXISTS "lineItems" (
	"id" bigint PRIMARY KEY NOT NULL,
	"item" varchar(255),
	"description" varchar(255),
	"quantity" integer,
	"rate_type" varchar(255),
	"price" real DEFAULT 10.1,
	"amount" real DEFAULT 10.1,
	"date_created" timestamp DEFAULT now() NOT NULL,
	"date_updated" timestamp DEFAULT now() NOT NULL,
	"estimate_id" bigint
);
