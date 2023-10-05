CREATE TABLE `customers` (
	`id` bigint,
	`name` varchar(255),
	`address` varchar(255),
	`email` varchar(255),
	`phone` varchar(255),
	CONSTRAINT `customers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` bigint,
	`business_name` varchar(255),
	`business_address` varchar(255),
	`business_email` varchar(255),
	`business_phone` varchar(255),
	CONSTRAINT `profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `customers` ADD CONSTRAINT `customers_id_users_id_fk` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_id_users_id_fk` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;