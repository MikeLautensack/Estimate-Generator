ALTER TABLE "estimates" ALTER COLUMN "subtotal" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "estimates" ALTER COLUMN "subtotal" SET DEFAULT 10.1;--> statement-breakpoint
ALTER TABLE "estimates" ALTER COLUMN "tax_rate" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "estimates" ALTER COLUMN "tax_rate" SET DEFAULT 10.1;--> statement-breakpoint
ALTER TABLE "estimates" ALTER COLUMN "tax" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "estimates" ALTER COLUMN "tax" SET DEFAULT 10.1;--> statement-breakpoint
ALTER TABLE "estimates" ALTER COLUMN "total" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "estimates" ALTER COLUMN "total" SET DEFAULT 10.1;--> statement-breakpoint
ALTER TABLE "lineItems" ALTER COLUMN "amount" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "lineItems" ALTER COLUMN "amount" SET DEFAULT 10.1;