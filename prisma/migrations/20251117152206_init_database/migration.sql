-- CreateTable
CREATE TABLE `modeles_voiture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `prix_par_jour` INTEGER NOT NULL,
    `nbPlaces` INTEGER NOT NULL DEFAULT 5,
    `transmission` ENUM('MANUELLE', 'AUTOMATIQUE') NOT NULL DEFAULT 'MANUELLE',
    `fuel_type` ENUM('ESSENCE', 'DIESEL', 'ELECTRIQUE', 'HYBRIDE') NOT NULL DEFAULT 'ESSENCE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `modeles_voiture_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plaque` VARCHAR(191) NOT NULL,
    `statut` ENUM('DISPONIBLE', 'MAINTENANCE', 'LOUE', 'RETIRE') NOT NULL DEFAULT 'DISPONIBLE',
    `modeleId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `vehicules_plaque_key`(`plaque`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NULL,
    `frais_supplementaires` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `locations_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_debut` DATETIME(3) NOT NULL,
    `date_fin` DATETIME(3) NOT NULL,
    `prix_total` INTEGER NOT NULL,
    `client_nom` VARCHAR(191) NOT NULL,
    `client_email` VARCHAR(191) NOT NULL,
    `client_tel` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'REJECTED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `vehiculeId` INTEGER NOT NULL,
    `lieuPriseEnChargeId` INTEGER NOT NULL,
    `lieuRetourId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `hashed_password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `admins_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vehicules` ADD CONSTRAINT `vehicules_modeleId_fkey` FOREIGN KEY (`modeleId`) REFERENCES `modeles_voiture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_vehiculeId_fkey` FOREIGN KEY (`vehiculeId`) REFERENCES `vehicules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_lieuPriseEnChargeId_fkey` FOREIGN KEY (`lieuPriseEnChargeId`) REFERENCES `locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_lieuRetourId_fkey` FOREIGN KEY (`lieuRetourId`) REFERENCES `locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
