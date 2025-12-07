'use server';

import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';

export async function createReservation(formData: FormData) {
    const modelId = parseInt(formData.get('modelId') as string);
    const locationId = parseInt(formData.get('locationId') as string);
    const returnLocationId = parseInt(formData.get('returnLocationId') as string);
    const startDateStr = formData.get('startDate') as string;
    const endDateStr = formData.get('endDate') as string;
    const startTime = formData.get('startTime') as string;
    const returnTime = formData.get('returnTime') as string;

    const lastName = formData.get('lastName') as string;
    const firstName = formData.get('firstName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    console.log('Received FormData:', Object.fromEntries(formData));
    console.log('Parsed IDs:', { modelId, locationId, returnLocationId });

    if (!modelId) return { error: 'Le modèle de véhicule est manquant.' };
    if (!locationId) return { error: 'Le lieu de départ est manquant.' };
    if (!startDateStr) return { error: 'La date de départ est manquante.' };
    if (!endDateStr) return { error: 'La date de retour est manquante.' };
    if (!lastName) return { error: 'Le nom est requis.' };
    if (!firstName) return { error: 'Le prénom est requis.' };
    if (!email) return { error: 'L\'email est requis.' };
    if (!phone) return { error: 'Le téléphone est requis.' };

    // Combine date and time
    const startDateTime = new Date(`${startDateStr}T${startTime || '00:00'}:00`);
    const endDateTime = new Date(`${endDateStr}T${returnTime || '00:00'}:00`);

    const now = new Date();
    // Reset seconds/milliseconds for fair comparison
    now.setSeconds(0, 0);

    if (startDateTime < now) {
        return { error: 'La date de départ ne peut pas être dans le passé.' };
    }

    if (endDateTime <= startDateTime) {
        return { error: 'La date de retour doit être ultérieure à la date de départ.' };
    }

    // 1. Find an available vehicle of this model
    // We need to check if there is any vehicle of this model that does NOT have overlapping reservations
    // AND has status DISPONIBLE

    // Simple naive check: find first available vehicle
    // In a real app, we would check for overlaps
    const availableVehicle = await prisma.vehicule.findFirst({
        where: {
            modeleId: modelId,
            statut: 'DISPONIBLE',
            reservations: {
                none: {
                    status: {
                        in: ['PENDING', 'CONFIRMED']
                    },
                    AND: [
                        { dateDebut: { lt: endDateTime } },
                        { dateFin: { gt: startDateTime } }
                    ]
                }
            }
        }
    });

    if (!availableVehicle) {
        return { error: 'Désolé, aucun véhicule de ce modèle n\'est disponible pour ces dates.' };
    }

    // Calculate price (naive implementation)
    const model = await prisma.modeleVoiture.findUnique({ where: { id: modelId } });
    if (!model) return { error: 'Modèle introuvable.' };

    const diffTime = Math.abs(endDateTime.getTime() - startDateTime.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = diffDays * model.prixParJour;

    try {
        await prisma.reservation.create({
            data: {
                dateDebut: startDateTime,
                dateFin: endDateTime,
                prixTotal: totalPrice,
                clientNom: lastName,
                clientPrenom: firstName,
                clientEmail: email,
                clientTel: phone,
                status: 'PENDING',
                vehiculeId: availableVehicle.id,
                lieuPriseEnChargeId: locationId,
                lieuRetourId: returnLocationId || locationId,
            }
        });
    } catch (e) {
        console.error(e);
        return { error: 'Une erreur est survenue lors de la création de la réservation.' };
    }

    redirect('/reservation/success');
}
