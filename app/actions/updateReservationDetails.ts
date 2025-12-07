'use server';

import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

interface ReservationUpdateData {
    dateDebut: Date;
    dateFin: Date;
    lieuPriseEnChargeId: number;
    lieuRetourId: number;
    prixTotal: number;
    note?: string | null;
    vehiculeId: number;
}

export async function updateReservationDetails(id: number, data: ReservationUpdateData) {
    try {
        const now = new Date();
        now.setSeconds(0, 0);

        if (data.dateDebut < now) {
            // ... existing checks ...
        }

        if (data.dateFin <= data.dateDebut) {
            return { success: false, error: 'La date de retour doit être après la date de début' };
        }

        await prisma.reservation.update({
            where: { id },
            data: {
                dateDebut: data.dateDebut,
                dateFin: data.dateFin,
                lieuPriseEnChargeId: data.lieuPriseEnChargeId,
                lieuRetourId: data.lieuRetourId,
                prixTotal: data.prixTotal,
                note: data.note,
                vehiculeId: data.vehiculeId,
            },
        });

        revalidatePath('/admin/reservations');
        return { success: true };
    } catch (error) {
        console.error('Failed to update reservation details:', error);
        return { success: false, error: 'Failed to update details' };
    }
}
