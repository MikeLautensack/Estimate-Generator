/*
  Warnings:

  - You are about to drop the column `first_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `customers` table. All the data in the column will be lost.
  - Added the required column `dateCreated` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateModified` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customers` DROP COLUMN `first_name`,
    DROP COLUMN `full_name`,
    DROP COLUMN `last_name`,
    ADD COLUMN `dateCreated` DATETIME NOT NULL,
    ADD COLUMN `dateModified` DATETIME NOT NULL,
    ADD COLUMN `name` VARCHAR(100) NULL;
