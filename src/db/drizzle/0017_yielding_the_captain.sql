ALTER TABLE "customers" RENAME COLUMN "name" TO "first_name";--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "address2" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "city" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "state" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "zip" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "last_name" varchar(255) NOT NULL;