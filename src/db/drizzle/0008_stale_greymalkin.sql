ALTER TABLE "changeOrders" ALTER COLUMN "id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "changeOrders" ALTER COLUMN "id" SET DEFAULT nextval('example_table_id_seq');--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "id" SET DEFAULT nextval('example_table_id_seq');--> statement-breakpoint
ALTER TABLE "estimates" ALTER COLUMN "id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "estimates" ALTER COLUMN "id" SET DEFAULT nextval('example_table_id_seq');--> statement-breakpoint
ALTER TABLE "lineItems" ALTER COLUMN "id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "lineItems" ALTER COLUMN "id" SET DEFAULT nextval('example_table_id_seq');--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "id" SET DEFAULT nextval('example_table_id_seq');