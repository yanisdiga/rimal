-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_lieuPriseEnChargeId_fkey`;

-- DropForeignKey
ALTER TABLE `reservations` DROP FOREIGN KEY `reservations_lieuRetourId_fkey`;

-- DropIndex
DROP INDEX `reservations_lieuPriseEnChargeId_fkey` ON `reservations`;

-- DropIndex
DROP INDEX `reservations_lieuRetourId_fkey` ON `reservations`;

-- AlterTable
ALTER TABLE `reservations` ADD COLUMN `custom_prise_en_charge` VARCHAR(191) NULL,
    ADD COLUMN `custom_retour` VARCHAR(191) NULL,
    MODIFY `lieuPriseEnChargeId` INTEGER NULL,
    MODIFY `lieuRetourId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_lieuPriseEnChargeId_fkey` FOREIGN KEY (`lieuPriseEnChargeId`) REFERENCES `locations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_lieuRetourId_fkey` FOREIGN KEY (`lieuRetourId`) REFERENCES `locations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
