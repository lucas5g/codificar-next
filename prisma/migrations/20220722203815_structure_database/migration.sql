-- CreateTable
CREATE TABLE `Setting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `qa` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Setting_name_key`(`name`),
    UNIQUE INDEX `Setting_projectId_key`(`projectId`),
    UNIQUE INDEX `Setting_qa_key`(`qa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `portal` VARCHAR(191) NOT NULL,
    `ios` VARCHAR(191) NOT NULL,
    `android` VARCHAR(191) NOT NULL,
    `versionWeb` VARCHAR(191) NULL,
    `versionIos` VARCHAR(191) NULL,
    `versionAndroid` VARCHAR(191) NULL,
    `extensionAndroid` VARCHAR(5) NOT NULL,
    `urlUploadAndroid` VARCHAR(200) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `projects_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
