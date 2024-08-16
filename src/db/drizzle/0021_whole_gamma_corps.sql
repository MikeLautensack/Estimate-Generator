ALTER TABLE "estimates" RENAME COLUMN "contractor_name" TO "contractor_first_name";--> statement-breakpoint
ALTER TABLE "estimates" RENAME COLUMN "customer_name" TO "customer_first_name";--> statement-breakpoint
ALTER TABLE "estimates" ADD COLUMN "contractor_last_name" varchar(255);--> statement-breakpoint
ALTER TABLE "estimates" ADD COLUMN "customer_last_name" varchar(255);