import React from 'react';
import { prisma } from '../../lib/prisma';
import { VehiclesSection } from '../components/VehiclesSection';
import { NavbarAndMenu } from '../components/Menu';

import '../../styles/reservation.css';

// Force dynamic rendering because we use searchParams
export const dynamic = 'force-dynamic';

export default async function ReservationPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;

    // Dans une implémentation réelle, on utiliserait searchParams pour filtrer
    const { startDate, endDate, startTime, returnTime } = resolvedSearchParams;

    // Construction de la condition de disponibilité temporelle
    let dateFilter: any = {};

    if (startDate && endDate) {
        const startDateTime = new Date(`${startDate}T${startTime || '00:00'}:00`);
        const endDateTime = new Date(`${endDate}T${returnTime || '00:00'}:00`);

        dateFilter = {
            none: {
                status: {
                    in: ['CONFIRMED']
                },
                AND: [
                    { dateDebut: { lt: endDateTime } },
                    { dateFin: { gt: startDateTime } }
                ]
            }
        };
    }

    const voitures = await prisma.modeleVoiture.findMany({
        where: {
            vehicules: {
                some: {
                    statut: 'DISPONIBLE',
                    reservations: dateFilter
                }
            }
        }
    });

    // On a aussi besoin des voitures pour le menu (si nécessaire)
    // Note: NavbarAndMenu attend 'voitures' pour le menu déroulant "Nos Véhicules"

    return (
        <>
            <NavbarAndMenu voitures={voitures} />
            <div className="reservation-page">
                <div className="reservation-container">
                    <h1 className="reservation-title">
                        Résultats de votre recherche
                    </h1>

                    {voitures.length === 0 ? (
                        <div className="no-results-container">
                            <div className="no-results-title">
                                Aucun véhicule disponible pour ces dates.
                            </div>
                            <p className="no-results-text">
                                Essayez de modifier vos dates ou contactez-nous directement.
                            </p>
                        </div>
                    ) : (
                        <VehiclesSection voitures={voitures} searchParams={resolvedSearchParams} />
                    )}
                </div>
            </div>

        </>
    );
}
