/*
  Warnings:

  - You are about to drop the column `name` on the `media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `media` DROP COLUMN `name`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL DEFAULT 'hello';
