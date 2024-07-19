ALTER TABLE "estimates" ADD PRIMARY KEY ("customer_user_id");--> statement-breakpoint
ALTER TABLE "estimates" ALTER COLUMN "customer_user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "estimates" ALTER COLUMN "customer_user_id" SET NOT NULL;