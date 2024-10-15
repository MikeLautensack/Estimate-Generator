ALTER TABLE "pdfs" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "pdfs" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "pdfs" ADD COLUMN "estimate_id" bigint NOT NULL;