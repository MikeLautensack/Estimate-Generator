ALTER TABLE `users` ADD `password` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` timestamp;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `image`;