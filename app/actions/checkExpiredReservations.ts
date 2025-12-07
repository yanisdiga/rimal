'use server';

import { prisma } from '@/lib/prisma';

export async function checkExpiredReservations() {
    try {
        const now = new Date();

        // Mise à jour de toutes les réservations PENDING dont la date de début est passée
        const result = await prisma.reservation.updateMany({
            where: {
                status: 'PENDING',
                dateDebut: {
                    lt: now, // "lt" signifie "less than" (strictement avant maintenant)
                },
            },
            data: {
                status: 'EXPIRED',
            },
        });

        if (result.count > 0) {
            console.log(`[Auto-Expire] ${result.count} réservation(s) expirée(s) mise(s) à jour.`);
        }

        return result.count;
    } catch (error) {
        console.error('Erreur lors de la vérification des réservations expirées:', error);
        return 0;
    }
}
