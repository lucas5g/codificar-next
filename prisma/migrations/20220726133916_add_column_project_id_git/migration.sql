/*
  Warnings:

  - Added the required column `projectIdGit` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` ADD COLUMN `projectIdGit` INTEGER NOT NULL;
