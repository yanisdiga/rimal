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
    // const { location, returnLocation, startDate, endDate, startTime, returnTime } = resolvedSearchParams;
    // Pour l'instant, on récupère tous les véhicules comme convenu
    const voitures = await prisma.modeleVoiture.findMany({
        where: {
            vehicules: {
                some: {
                    statut: 'DISPONIBLE'
                }
            }
        }
    });

    // On a aussi besoin des voitures pour le menu (si nécessaire)
    // Note: NavbarAndMenu attend 'voitures' pour le menu déroulant "Nos Véhicules"

    return (
        <>
            <NavbarAndMenu voitures={voitures} />
            <div className="reservation-page" style={{ paddingTop: '100px' }}>
                <div className="reservation-container">
                    <h1 className="reservation-title">
                        Résultats de votre recherche
                    </h1>
                    {/* On réutilise la section véhicules existante */}
                    <VehiclesSection voitures={voitures} searchParams={resolvedSearchParams} />
                </div>
            </div>

        </>
    );
}
