CREATE TABLE `changeOrders` (
	`id` bigint NOT NULL,
	`estimate_name` varchar(255),
	`description` varchar(255),
	`customer_name` varchar(255),
	`work_address` varchar(255),
	`status` varchar(255),
	`user_id` bigint,
	CONSTRAINT `changeOrders_id` PRIMARY KEY(`id`)
);
