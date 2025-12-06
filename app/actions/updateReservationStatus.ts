'use server';

import { prisma } from '../../lib/prisma';
import { StatusReservation } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function updateReservationStatus(id: number, status: StatusReservation) {
    try {
        await prisma.reservation.update({
            where: { id },
            data: { status },
        });

        revalidatePath('/admin/reservations');
        return { success: true };
    } catch (error) {
        console.error('Failed to update reservation status:', error);
        return { success: false, error: 'Failed to update status' };
    }
}
