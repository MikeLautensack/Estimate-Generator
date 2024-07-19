DROP TABLE "accounts";--> statement-breakpoint
DROP TABLE "sessions";--> statement-breakpoint
DROP TABLE "verificationToken";--> statement-breakpoint
ALTER TABLE "users" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "deleted_at" timestamp;