/*
  Warnings:

  - You are about to drop the column `projectIdGit` on the `projects` table. All the data in the column will be lost.
  - Added the required column `projectIdGitUser` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` DROP COLUMN `projectIdGit`,
    ADD COLUMN `projectIdGitUser` INTEGER NOT NULL;
