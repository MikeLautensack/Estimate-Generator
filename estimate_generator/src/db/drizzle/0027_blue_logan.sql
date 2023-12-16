ALTER TABLE `changeOrders` ADD `date_created` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `changeOrders` ADD `date_updated` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `customers` ADD `date_created` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `customers` ADD `date_updated` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `estimates` ADD `date_created` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `estimates` ADD `date_updated` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` ADD `date_created` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` ADD `date_updated` timestamp DEFAULT (now()) NOT NULL;