CREATE TABLE IF NOT EXISTS "pdfs" (
	"id" text PRIMARY KEY NOT NULL,
	"contractor_id" text,
	"customer_id" text,
	"file_key" text,
	"file_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
