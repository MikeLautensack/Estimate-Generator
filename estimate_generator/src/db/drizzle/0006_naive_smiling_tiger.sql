CREATE TABLE `estimates` (
	`id` bigint NOT NULL,
	`estimateName` varchar(255),
	`customerName` varchar(255),
	`customerBusinessName` varchar(255),
	`projectAddress` varchar(255),
	`contractorName` varchar(255),
	`contractorAddress` varchar(255),
	`contractorPhone` varchar(255),
	`massage` varchar(255),
	`subtotal` decimal(14,2),
	`tax` decimal(14,2),
	`total` decimal(14,2),
	`user_id` bigint,
	CONSTRAINT `estimates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lineItems` (
	`id` bigint NOT NULL,
	`description` varchar(255),
	`quantity` int,
	`rate_type` varchar(255),
	`unit_type` varchar(255),
	`unit_rate` decimal(14,2),
	`total` decimal(14,2),
	`estimate_id` bigint,
	CONSTRAINT `lineItems_id` PRIMARY KEY(`id`)
);
