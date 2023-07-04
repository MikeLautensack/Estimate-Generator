-- CreateTable
CREATE TABLE `customers` (
    `customer_id` INTEGER NOT NULL,
    `first_name` VARCHAR(100) NULL,
    `last_name` VARCHAR(100) NULL,
    `full_name` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `phone_number` INTEGER NULL,
    `address` VARCHAR(255) NULL,
    `user_id` INTEGER NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estimates` (
    `estimate_id` INTEGER NOT NULL,
    `estimate_name` VARCHAR(100) NULL,
    `customer_name` VARCHAR(100) NULL,
    `customer_email` VARCHAR(100) NULL,
    `customer_phone` VARCHAR(100) NULL,
    `address` VARCHAR(100) NULL,
    `date_created` DATE NULL,
    `date_modified` DATE NULL,
    `total` DECIMAL(50, 2) NULL,
    `user_id` INTEGER NULL,
    `customer_id` INTEGER NULL,

    INDEX `customer_id`(`customer_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`estimate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subtasks` (
    `subtasks` INTEGER NOT NULL,
    `subtask_name` VARCHAR(45) NULL,
    `subtask_description` VARCHAR(100) NULL,
    `calc_method` VARCHAR(45) NULL,
    `time_unit` VARCHAR(45) NULL,
    `time_price_per_unit` DECIMAL(50, 2) NULL,
    `time_quantity` DECIMAL(50, 2) NULL,
    `time_subtotal` DECIMAL(50, 2) NULL,
    `materials_unit` VARCHAR(45) NULL,
    `materials_price_per_unit` DECIMAL(50, 2) NULL,
    `materials_quantitly` DECIMAL(50, 2) NULL,
    `materials_subtotal` DECIMAL(50, 2) NULL,
    `unit` VARCHAR(45) NULL,
    `price_per_unit` DECIMAL(50, 2) NULL,
    `quantity` DECIMAL(50, 2) NULL,
    `custom_subtotal` DECIMAL(50, 2) NULL,
    `subtotal` DECIMAL(50, 2) NULL,
    `subtask_total` DECIMAL(50, 2) NULL,
    `task_id` INTEGER NULL,

    INDEX `task_id`(`task_id`),
    PRIMARY KEY (`subtasks`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `task_id` INTEGER NOT NULL,
    `task_name` VARCHAR(100) NULL,
    `task_description` VARCHAR(255) NULL,
    `total` DECIMAL(50, 2) NULL,
    `estimate_id` INTEGER NULL,

    INDEX `fk_tasks_estimates`(`estimate_id`),
    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL,
    `username` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `password` VARCHAR(100) NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `estimates` ADD CONSTRAINT `estimates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `estimates` ADD CONSTRAINT `estimates_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subtasks` ADD CONSTRAINT `subtasks_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks`(`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `fk_tasks_estimates` FOREIGN KEY (`estimate_id`) REFERENCES `estimates`(`estimate_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
