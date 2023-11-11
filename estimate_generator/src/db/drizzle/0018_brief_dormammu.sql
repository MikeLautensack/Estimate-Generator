ALTER TABLE `customers` RENAME COLUMN `user_id` TO `contractor_user_id`;--> statement-breakpoint
ALTER TABLE `customers` ADD `customer_user_id` bigint;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `emailVerified`;