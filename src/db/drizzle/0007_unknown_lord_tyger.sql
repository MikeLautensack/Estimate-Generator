ALTER TABLE "users" ALTER COLUMN "new_user" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "changeOrders" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "contractor_user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "customer_user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "estimates" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "lineItems" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "changeOrders" ADD COLUMN "created_at" timestamp DEFAULT NOW() NOT NULL;--> statement-breakpoint
ALTER TABLE "changeOrders" ADD COLUMN "updated_at" timestamp DEFAULT NOW() NOT NULL;--> statement-breakpoint
ALTER TABLE "changeOrders" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "created_at" timestamp DEFAULT NOW() NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "updated_at" timestamp DEFAULT NOW() NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "order_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "work_address" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "estimates" ADD COLUMN "created_at" timestamp DEFAULT NOW() NOT NULL;--> statement-breakpoint
ALTER TABLE "estimates" ADD COLUMN "updated_at" timestamp DEFAULT NOW() NOT NULL;--> statement-breakpoint
ALTER TABLE "estimates" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "lineItems" ADD COLUMN "created_at" timestamp DEFAULT NOW() NOT NULL;--> statement-breakpoint
ALTER TABLE "lineItems" ADD COLUMN "updated_at" timestamp DEFAULT NOW() NOT NULL;--> statement-breakpoint
ALTER TABLE "lineItems" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "created_at" timestamp DEFAULT NOW() NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "updated_at" timestamp DEFAULT NOW() NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "changeOrders" DROP COLUMN IF EXISTS "date_created";--> statement-breakpoint
ALTER TABLE "changeOrders" DROP COLUMN IF EXISTS "date_updated";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "address";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "phone";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "date_created";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "date_updated";--> statement-breakpoint
ALTER TABLE "estimates" DROP COLUMN IF EXISTS "date_created";--> statement-breakpoint
ALTER TABLE "estimates" DROP COLUMN IF EXISTS "date_updated";--> statement-breakpoint
ALTER TABLE "lineItems" DROP COLUMN IF EXISTS "date_created";--> statement-breakpoint
ALTER TABLE "lineItems" DROP COLUMN IF EXISTS "date_updated";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "date_created";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "date_updated";