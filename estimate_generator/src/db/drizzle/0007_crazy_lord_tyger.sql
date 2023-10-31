ALTER TABLE `estimates` RENAME COLUMN `customerBusinessName` TO `customerEmail`;--> statement-breakpoint
ALTER TABLE `lineItems` RENAME COLUMN `total` TO `amount`;--> statement-breakpoint
ALTER TABLE `estimates` ADD `taxRate` decimal(2,2);--> statement-breakpoint
ALTER TABLE `lineItems` ADD `item` varchar(255);--> statement-breakpoint
ALTER TABLE `lineItems` ADD `price` varchar(255);--> statement-breakpoint
ALTER TABLE `lineItems` DROP COLUMN `unit_type`;--> statement-breakpoint
ALTER TABLE `lineItems` DROP COLUMN `unit_rate`;