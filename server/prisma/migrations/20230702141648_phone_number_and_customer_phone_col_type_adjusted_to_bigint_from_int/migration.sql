/*
  Warnings:

  - You are about to alter the column `dateCreated` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateModified` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `customer_phone` on the `estimates` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `customers` MODIFY `phone_number` BIGINT NULL,
    MODIFY `dateCreated` DATETIME NOT NULL,
    MODIFY `dateModified` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `estimates` MODIFY `customer_phone` BIGINT NULL;
