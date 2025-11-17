/*
  Warnings:

  - Made the column `url` on table `background_image` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `background_image_name_key` ON `background_image`;

-- AlterTable
ALTER TABLE `background_image` ADD COLUMN `subtitle` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NULL,
    MODIFY `url` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `horaires` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jour_de_semaine` ENUM('LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE') NOT NULL,
    `est_ferme` BOOLEAN NOT NULL DEFAULT false,
    `ouverture_matin` VARCHAR(191) NULL,
    `fermeture_matin` VARCHAR(191) NULL,
    `ouverture_aprem` VARCHAR(191) NULL,
    `fermeture_aprem` VARCHAR(191) NULL,
    `locationId` INTEGER NOT NULL,

    UNIQUE INDEX `horaires_locationId_jour_de_semaine_key`(`locationId`, `jour_de_semaine`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `horaires` ADD CONSTRAINT `horaires_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `locations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
