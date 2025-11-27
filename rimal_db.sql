-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 27 nov. 2025 à 11:31
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rimal_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `hashed_password` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `background_image`
--

CREATE TABLE `background_image` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `url` text NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `subtitle` varchar(191) DEFAULT NULL,
  `title` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `background_image`
--

INSERT INTO `background_image` (`id`, `name`, `url`, `created_at`, `updated_at`, `subtitle`, `title`) VALUES
(1, 'image1', 'https://as1.ftcdn.net/v2/jpg/02/36/07/72/1000_F_236077248_dCntOl6ryo9T09cobvfoQiWu6Yj1Lvbo.jpg', '2025-11-17 21:59:08.000', '2025-11-17 21:59:08.000', NULL, NULL),
(2, 'image2', 'https://as2.ftcdn.net/jpg/04/48/54/53/1000_F_448545328_5WSu1v3NjrG7LBhxKKQJQyJTNpYRqV8Q.webp', '2025-11-17 22:02:53.964', '2025-11-17 22:02:53.964', NULL, NULL),
(3, 'image3', 'https://as1.ftcdn.net/jpg/02/92/57/70/1000_F_292577016_yzBureQrGH7uf2WIyPO85UMNOCCvW8SL.webp', '2025-11-17 22:03:37.266', '2025-11-17 22:03:37.266', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `horaires`
--

CREATE TABLE `horaires` (
  `id` int(11) NOT NULL,
  `jour_de_semaine` enum('LUNDI','MARDI','MERCREDI','JEUDI','VENDREDI','SAMEDI','DIMANCHE') NOT NULL,
  `est_ferme` tinyint(1) NOT NULL DEFAULT 0,
  `ouverture_matin` varchar(191) DEFAULT NULL,
  `fermeture_matin` varchar(191) DEFAULT NULL,
  `ouverture_aprem` varchar(191) DEFAULT NULL,
  `fermeture_aprem` varchar(191) DEFAULT NULL,
  `locationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `horaires`
--

INSERT INTO `horaires` (`id`, `jour_de_semaine`, `est_ferme`, `ouverture_matin`, `fermeture_matin`, `ouverture_aprem`, `fermeture_aprem`, `locationId`) VALUES
(1, 'LUNDI', 0, '09:00', '18:00', NULL, NULL, 3),
(2, 'MARDI', 0, '09:00', '18:00', NULL, NULL, 3),
(3, 'MERCREDI', 0, '09:00', '18:00', NULL, NULL, 3),
(4, 'JEUDI', 0, '09:00', '18:00', NULL, NULL, 3),
(5, 'VENDREDI', 0, '09:00', '18:00', NULL, NULL, 3),
(6, 'SAMEDI', 0, '09:00', '18:00', NULL, NULL, 3),
(7, 'DIMANCHE', 1, NULL, NULL, NULL, NULL, 3),
(8, 'LUNDI', 0, '09:00', '18:00', NULL, NULL, 5),
(9, 'MARDI', 0, '09:00', '18:00', NULL, NULL, 5),
(10, 'MERCREDI', 0, '09:00', '18:00', NULL, NULL, 5),
(11, 'JEUDI', 0, '09:00', '18:00', NULL, NULL, 5),
(12, 'VENDREDI', 0, '09:00', '18:00', NULL, NULL, 5),
(13, 'SAMEDI', 0, '09:00', '18:00', NULL, NULL, 5),
(14, 'DIMANCHE', 1, NULL, NULL, NULL, NULL, 5);

-- --------------------------------------------------------

--
-- Structure de la table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `nom` varchar(191) NOT NULL,
  `adresse` varchar(191) DEFAULT NULL,
  `frais_supplementaires` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `locations`
--

INSERT INTO `locations` (`id`, `nom`, `adresse`, `frais_supplementaires`, `created_at`) VALUES
(3, 'Place Jemaa el-Fna', 'Marrakech 40000, Maroc', 0, '2025-11-17 23:15:23.000'),
(5, 'Aéroport Marrakech-Menara', 'Marrakech 40000, Maroc', 0, '2025-11-17 23:17:25.000');

-- --------------------------------------------------------

--
-- Structure de la table `modeles_voiture`
--

CREATE TABLE `modeles_voiture` (
  `id` int(11) NOT NULL,
  `nom` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `imageUrl` varchar(191) DEFAULT NULL,
  `prix_par_jour` int(11) NOT NULL,
  `nbPlaces` int(11) NOT NULL DEFAULT 5,
  `transmission` enum('MANUELLE','AUTOMATIQUE') NOT NULL DEFAULT 'MANUELLE',
  `fuel_type` enum('ESSENCE','DIESEL','ELECTRIQUE','HYBRIDE') NOT NULL DEFAULT 'ESSENCE',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `modeles_voiture`
--

INSERT INTO `modeles_voiture` (`id`, `nom`, `description`, `imageUrl`, `prix_par_jour`, `nbPlaces`, `transmission`, `fuel_type`, `created_at`, `updated_at`) VALUES
(1, 'Renault Clio 5 - Grise', 'Petite citadine parfaite pour la ville.', 'https://directus.roulenloc.fr/uploads/tiliti_leasing/originals/renault_24cliotechnohb5rb_angularfront.png', 45, 5, 'MANUELLE', 'ESSENCE', '2025-11-17 22:36:31.000', '2025-11-17 22:36:31.000');

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `date_debut` datetime(3) NOT NULL,
  `date_fin` datetime(3) NOT NULL,
  `prix_total` int(11) NOT NULL,
  `client_nom` varchar(191) NOT NULL,
  `client_email` varchar(191) NOT NULL,
  `client_tel` varchar(191) NOT NULL,
  `status` enum('PENDING','CONFIRMED','REJECTED','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `vehiculeId` int(11) NOT NULL,
  `lieuPriseEnChargeId` int(11) NOT NULL,
  `lieuRetourId` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `vehicules`
--

CREATE TABLE `vehicules` (
  `id` int(11) NOT NULL,
  `plaque` varchar(191) NOT NULL,
  `statut` enum('DISPONIBLE','MAINTENANCE','LOUE','RETIRE') NOT NULL DEFAULT 'DISPONIBLE',
  `modeleId` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `vehicules`
--

INSERT INTO `vehicules` (`id`, `plaque`, `statut`, `modeleId`, `created_at`, `updated_at`) VALUES
(1, 'AA-123-BB', 'DISPONIBLE', 1, '2025-11-17 22:36:55.000', '2025-11-24 00:13:03.691');

-- --------------------------------------------------------

--
-- Structure de la table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('10742bdc-e58b-40ab-96ea-0c60aaac403b', '37b435e15b2df6a4ccb78faaa6be181ac2f604f38ca877fbd3e7afdb22e3ea22', '2025-11-17 20:47:48.116', '20251117204748_add_table_background_image', NULL, NULL, '2025-11-17 20:47:48.097', 1),
('42fbe7b1-00e4-4313-90f8-81859aa05bec', '0d37caa63704118063d831f4e8de7913a92f5bf887c0cbd86c39f1283b9f0997', '2025-11-17 22:07:13.695', '20251117220713_add_date_table', NULL, NULL, '2025-11-17 22:07:13.625', 1),
('a3cddb06-d403-4dce-b3f4-3801f828668d', 'd76e8de8b8ebac4e8955aca704f73ba8696d3fb6bc2a11e4b1eb3750cf6bb4de', '2025-11-17 20:37:43.832', '20251117152206_init_database', NULL, NULL, '2025-11-17 20:37:43.629', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_key` (`email`);

--
-- Index pour la table `background_image`
--
ALTER TABLE `background_image`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `horaires`
--
ALTER TABLE `horaires`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `horaires_locationId_jour_de_semaine_key` (`locationId`,`jour_de_semaine`);

--
-- Index pour la table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `locations_nom_key` (`nom`);

--
-- Index pour la table `modeles_voiture`
--
ALTER TABLE `modeles_voiture`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `modeles_voiture_nom_key` (`nom`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservations_vehiculeId_fkey` (`vehiculeId`),
  ADD KEY `reservations_lieuPriseEnChargeId_fkey` (`lieuPriseEnChargeId`),
  ADD KEY `reservations_lieuRetourId_fkey` (`lieuRetourId`);

--
-- Index pour la table `vehicules`
--
ALTER TABLE `vehicules`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vehicules_plaque_key` (`plaque`),
  ADD KEY `vehicules_modeleId_fkey` (`modeleId`);

--
-- Index pour la table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `background_image`
--
ALTER TABLE `background_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `horaires`
--
ALTER TABLE `horaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `modeles_voiture`
--
ALTER TABLE `modeles_voiture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `vehicules`
--
ALTER TABLE `vehicules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `horaires`
--
ALTER TABLE `horaires`
  ADD CONSTRAINT `horaires_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_lieuPriseEnChargeId_fkey` FOREIGN KEY (`lieuPriseEnChargeId`) REFERENCES `locations` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_lieuRetourId_fkey` FOREIGN KEY (`lieuRetourId`) REFERENCES `locations` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_vehiculeId_fkey` FOREIGN KEY (`vehiculeId`) REFERENCES `vehicules` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `vehicules`
--
ALTER TABLE `vehicules`
  ADD CONSTRAINT `vehicules_modeleId_fkey` FOREIGN KEY (`modeleId`) REFERENCES `modeles_voiture` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
