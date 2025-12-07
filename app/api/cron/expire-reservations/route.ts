import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkExpiredReservations } from '@/app/actions/checkExpiredReservations';

export const dynamic = 'force-dynamic'; // Pour éviter que la route soit mise en cache statiquement

export async function GET() {
    try {
        const now = new Date();

        // Mise à jour de toutes les réservations PENDING dont la date de début est passée
        const count = await checkExpiredReservations();

        return NextResponse.json({
            success: true,
            message: `Mise à jour effectuée. ${count} réservation(s) expirée(s).`,
            count: count,
            timestamp: now.toISOString(),
        });
    } catch (error) {
        console.error('Erreur lors de l\'expiration des réservations:', error);
        return NextResponse.json(
            { success: false, error: 'Une erreur interne est survenue.' },
            { status: 500 }
        );
    }
}
