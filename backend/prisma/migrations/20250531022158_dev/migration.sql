-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Users_Username_key`(`Username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Groups` (
    `GroupId` INTEGER NOT NULL AUTO_INCREMENT,
    `GroupName` VARCHAR(191) NOT NULL,
    `UserId` INTEGER NOT NULL,

    PRIMARY KEY (`GroupId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ItemName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroupItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `GroupId` INTEGER NOT NULL,
    `ItemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Round` (
    `RoundId` INTEGER NOT NULL AUTO_INCREMENT,
    `isStarted` BOOLEAN NOT NULL DEFAULT false,
    `GroupId` INTEGER NOT NULL,

    PRIMARY KEY (`RoundId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Round_User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RoundId` INTEGER NOT NULL,
    `UserId` INTEGER NOT NULL,
    `isComplete` BOOLEAN NOT NULL DEFAULT false,
    `isJoined` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `RoundId` INTEGER NOT NULL,
    `UserId` INTEGER NOT NULL,
    `ItemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Groups` ADD CONSTRAINT `Groups_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupItem` ADD CONSTRAINT `GroupItem_GroupId_fkey` FOREIGN KEY (`GroupId`) REFERENCES `Groups`(`GroupId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupItem` ADD CONSTRAINT `GroupItem_ItemId_fkey` FOREIGN KEY (`ItemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Round` ADD CONSTRAINT `Round_GroupId_fkey` FOREIGN KEY (`GroupId`) REFERENCES `Groups`(`GroupId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Round_User` ADD CONSTRAINT `Round_User_RoundId_fkey` FOREIGN KEY (`RoundId`) REFERENCES `Round`(`RoundId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Round_User` ADD CONSTRAINT `Round_User_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_RoundId_fkey` FOREIGN KEY (`RoundId`) REFERENCES `Round`(`RoundId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_ItemId_fkey` FOREIGN KEY (`ItemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
