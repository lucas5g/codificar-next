/*
  Warnings:

  - Added the required column `extensionAndroid` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlUploadAndroid` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` ADD COLUMN `extensionAndroid` VARCHAR(191) NOT NULL,
    ADD COLUMN `urlUploadAndroid` VARCHAR(191) NOT NULL;
