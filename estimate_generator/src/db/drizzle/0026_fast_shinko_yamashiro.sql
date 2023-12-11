ALTER TABLE `estimates` MODIFY COLUMN `subtotal` double(14,2);--> statement-breakpoint
ALTER TABLE `estimates` MODIFY COLUMN `tax_rate` double(2,2);--> statement-breakpoint
ALTER TABLE `estimates` MODIFY COLUMN `tax` double(14,2);--> statement-breakpoint
ALTER TABLE `estimates` MODIFY COLUMN `total` double(14,2);--> statement-breakpoint
ALTER TABLE `lineItems` MODIFY COLUMN `amount` double(14,2);