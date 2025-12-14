'use server';

import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';

export async function createReservation(formData: FormData) {
    const modelId = parseInt(formData.get('modelId') as string);
    // Parse inputs
    let locationId = formData.get('locationId') ? parseInt(formData.get('locationId') as string) : null;
    let returnLocationId = formData.get('returnLocationId') ? parseInt(formData.get('returnLocationId') as string) : null;

    const customLocation = formData.get('customLocation') as string;
    const customReturnLocation = formData.get('customReturnLocation') as string;

    // HARDENING: Enforce mutual exclusivity
    // If a custom location is provided, ignore the standard ID
    if (customLocation) {
        locationId = null;
    }
    if (customReturnLocation) {
        returnLocationId = null;
    }

    const startDateStr = formData.get('startDate') as string;
    const endDateStr = formData.get('endDate') as string;
    const startTime = formData.get('startTime') as string;
    const returnTime = formData.get('returnTime') as string;

    const lastName = formData.get('lastName') as string;
    const firstName = formData.get('firstName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    console.log('Received FormData:', Object.fromEntries(formData));
    console.log('Parsed:', { modelId, locationId, returnLocationId, customLocation });

    if (!modelId) return { error: 'Le modèle de véhicule est manquant.' };

    // CUSTOM LOGIC: Either standard location OR custom location is required
    if (!locationId && !customLocation) {
        return { error: 'Le lieu de départ est manquant. Veuillez choisir un lieu ou saisir une adresse.' };
    }

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

    // 1. Availability Check
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
        // Fallback: Check if ANY vehicle of this model exists, to give a better error? 
        // Or just say unavailable.
        return { error: 'Désolé, aucun véhicule de ce modèle n\'est disponible pour ces dates.' };
    }

    // Calculate price
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

                // Use connect for relation
                vehicule: {
                    connect: { id: availableVehicle.id }
                },

                // Use connect for optional locations if ID matches, else null
                lieuPriseEnCharge: locationId ? { connect: { id: locationId } } : undefined,

                // Logic for Return Location:
                // 1. If we have a specific returnLocationId (validated above to be non-custom), use it.
                // 2. If NOT (null), check if we are in a "Standard Mode" (No custom return, No custom pickup).
                //    If so, fallback to locationId (Same as Pickup).
                // 3. Otherwise (Custom mode involved), leave as undefined/null.
                lieuRetour: (returnLocationId)
                    ? { connect: { id: returnLocationId } }
                    : (!customReturnLocation && !customLocation && locationId)
                        ? { connect: { id: locationId } }
                        : undefined,

                // Custom fields
                customPriseEnCharge: customLocation || undefined,
                // If customReturnLocation is provided, use it. 
                // Else if customLocation (pickup) is provided AND returnLocationId is empty/null, it typically implies return = pickup.
                // However, our flow suggests if returnLocationId is provided, we use it. 
                customRetour: customReturnLocation || customLocation || undefined,
            }
        });
    } catch (e) {
        console.error(e);
        return { error: 'Une erreur est survenue lors de la création de la réservation.' };
    }

    redirect('/reservation/success');
}
