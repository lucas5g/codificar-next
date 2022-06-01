-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `portal` VARCHAR(191) NOT NULL,
    `ios` VARCHAR(191) NOT NULL,
    `android` VARCHAR(191) NOT NULL,
    `versionWeb` VARCHAR(191) NULL,
    `versionIos` VARCHAR(191) NULL,
    `versionAndroid` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `products_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
