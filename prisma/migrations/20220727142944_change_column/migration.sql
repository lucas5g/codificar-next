/*
  Warnings:

  - You are about to drop the column `urlUPloadAndroidProvider` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `clients` DROP COLUMN `urlUPloadAndroidProvider`,
    ADD COLUMN `urlUploadAndroidProvider` VARCHAR(191) NULL;
