ALTER TABLE `changeOrders` RENAME COLUMN `user_id` TO `contractor_user_id`;--> statement-breakpoint
ALTER TABLE `changeOrders` ADD `customer_user_id` bigint;--> statement-breakpoint
ALTER TABLE `estimates` ADD `customer_user_id` bigint;--> statement-breakpoint
ALTER TABLE `estimates` ADD `contractor_user_id` bigint;--> statement-breakpoint
ALTER TABLE `estimates` DROP COLUMN `user_id`;