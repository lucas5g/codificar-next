/*
  Warnings:

  - Added the required column `projectIdGitProvider` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectIdGitWeb` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` ADD COLUMN `projectIdGitProvider` INTEGER NOT NULL,
    ADD COLUMN `projectIdGitWeb` INTEGER NOT NULL;
