ALTER TABLE `customers` MODIFY COLUMN `customer_user_id` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `emailVerified` timestamp;