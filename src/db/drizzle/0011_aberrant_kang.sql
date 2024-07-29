ALTER TABLE "estimates" ADD COLUMN "tax_mode" varchar(255);--> statement-breakpoint
ALTER TABLE "estimates" ADD COLUMN "discount_mode" varchar(255);--> statement-breakpoint
ALTER TABLE "estimates" ADD COLUMN "discount" real DEFAULT 10.1;