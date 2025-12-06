/*
  Warnings:

  - Added the required column `client_prenom` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservations` ADD COLUMN `client_prenom` VARCHAR(191) NOT NULL;
