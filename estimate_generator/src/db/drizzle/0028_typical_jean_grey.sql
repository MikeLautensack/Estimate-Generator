ALTER TABLE `lineItems` ADD `date_created` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `lineItems` ADD `date_updated` timestamp DEFAULT (now()) NOT NULL;