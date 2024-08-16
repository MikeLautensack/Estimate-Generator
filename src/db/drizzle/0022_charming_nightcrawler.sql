ALTER TABLE "estimates" RENAME COLUMN "contractor_first_name" TO "contractor_name";--> statement-breakpoint
ALTER TABLE "estimates" DROP COLUMN IF EXISTS "contractor_last_name";