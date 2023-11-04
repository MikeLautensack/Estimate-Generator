ALTER TABLE `changeOrders` RENAME COLUMN `estimateName` TO `estimate_name`;--> statement-breakpoint
ALTER TABLE `changeOrders` RENAME COLUMN `customerName` TO `customer_name`;--> statement-breakpoint
ALTER TABLE `changeOrders` RENAME COLUMN `workAddress` TO `work_address`;--> statement-breakpoint
ALTER TABLE `estimates` RENAME COLUMN `estimateName` TO `estimate_name`;--> statement-breakpoint
ALTER TABLE `estimates` RENAME COLUMN `customerName` TO `customer_name`;--> statement-breakpoint
ALTER TABLE `estimates` RENAME COLUMN `customerEmail` TO `customer_email`;--> statement-breakpoint
ALTER TABLE `estimates` RENAME COLUMN `projectAddress` TO `project_address`;--> statement-breakpoint
ALTER TABLE `estimates` RENAME COLUMN `contractorName` TO `contractor_name`;--> statement-breakpoint
ALTER TABLE `estimates` RENAME COLUMN `contractorAddress` TO `contractor_address`;--> statement-breakpoint
ALTER TABLE `estimates` RENAME COLUMN `contractorPhone` TO `contractor_phone`;--> statement-breakpoint
ALTER TABLE `estimates` RENAME COLUMN `taxRate` TO `tax_rate`;