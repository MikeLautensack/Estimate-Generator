ALTER TABLE `customers` DROP FOREIGN KEY `customers_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `customers` MODIFY COLUMN `id` bigint AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `profiles` MODIFY COLUMN `id` bigint AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `customers` ADD `user_id` bigint;--> statement-breakpoint
ALTER TABLE `profiles` ADD `user_id` bigint;