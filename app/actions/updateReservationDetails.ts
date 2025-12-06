'use server';

import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

interface ReservationUpdateData {
    dateDebut: Date;
    dateFin: Date;
    lieuPriseEnChargeId: number;
    lieuRetourId: number;
    prixTotal: number;
}

export async function updateReservationDetails(id: number, data: ReservationUpdateData) {
    try {
        await prisma.reservation.update({
            where: { id },
            data: {
                dateDebut: data.dateDebut,
                dateFin: data.dateFin,
                lieuPriseEnChargeId: data.lieuPriseEnChargeId,
                lieuRetourId: data.lieuRetourId,
                prixTotal: data.prixTotal,
            },
        });

        revalidatePath('/admin/reservations');
        return { success: true };
    } catch (error) {
        console.error('Failed to update reservation details:', error);
        return { success: false, error: 'Failed to update details' };
    }
}
