/*
  Warnings:

  - You are about to alter the column `dateCreated` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dateModified` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `subtasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subtasks` on the `subtasks` table. All the data in the column will be lost.
  - Added the required column `subtask_id` to the `subtasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customers` MODIFY `dateCreated` DATETIME NOT NULL,
    MODIFY `dateModified` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `subtasks` DROP PRIMARY KEY,
    DROP COLUMN `subtasks`,
    ADD COLUMN `subtask_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`subtask_id`);
