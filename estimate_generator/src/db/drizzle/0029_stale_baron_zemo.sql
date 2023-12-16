ALTER TABLE `changeOrders` MODIFY COLUMN `date_updated` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `customers` MODIFY COLUMN `date_updated` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `estimates` MODIFY COLUMN `date_updated` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` MODIFY COLUMN `date_updated` timestamp NOT NULL;