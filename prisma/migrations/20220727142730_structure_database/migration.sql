-- CreateTable
CREATE TABLE `projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectIdRedmine` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NULL,
    `channelRocket` VARCHAR(191) NOT NULL,
    `qa` VARCHAR(191) NOT NULL,
    `projectIdGitWeb` INTEGER NOT NULL,
    `projectIdGitUser` INTEGER NOT NULL,
    `projectIdGitProvider` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `projects_projectIdRedmine_key`(`projectIdRedmine`),
    UNIQUE INDEX `projects_name_key`(`name`),
    UNIQUE INDEX `projects_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `web` VARCHAR(191) NOT NULL,
    `iosUser` VARCHAR(191) NOT NULL,
    `iosProvider` VARCHAR(191) NULL,
    `androidUser` VARCHAR(191) NOT NULL,
    `androidProvider` VARCHAR(191) NULL,
    `versionWeb` VARCHAR(191) NOT NULL,
    `versionIosUser` VARCHAR(191) NOT NULL,
    `versionIosProvider` VARCHAR(191) NULL,
    `versionAndroidUser` VARCHAR(191) NOT NULL,
    `versionAndroidProvider` VARCHAR(191) NULL,
    `extensionAndroid` VARCHAR(191) NOT NULL,
    `urlUploadAndroidUser` VARCHAR(191) NOT NULL,
    `urlUPloadAndroidProvider` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `projectId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `clients_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clients` ADD CONSTRAINT `clients_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
