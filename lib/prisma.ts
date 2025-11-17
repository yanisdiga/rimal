// rimal/lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// On déclare un objet global pour stocker le client Prisma
// afin qu'il persiste entre les rechargements à chaud (hot-reloads) en dev.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// On exporte le client Prisma.
// S'il existe déjà sur l'objet global, on le réutilise.
// Sinon, on en crée un nouveau.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Optionnel : permet de voir les requêtes SQL dans votre console
    // pendant le développement.
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// En développement, on sauvegarde le client nouvellement créé 
// sur l'objet global pour le prochain rechargement.
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}