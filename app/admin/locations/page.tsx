import { PrismaClient } from '@prisma/client';
import { AddLocationForm, DeleteLocationButton } from './forms';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function LocationsPage() {
    const locations = await prisma.location.findMany({
        orderBy: {
            nom: 'asc',
        },
    });

    return (
        <div className="admin-location-container">
            <Link href="/admin" className="back-button menu-item-link">Retour</Link>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestion des Lieux</h1>

            <AddLocationForm />

            <div className="actual-locations">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Lieux Enregistrés ({locations.length})</h2>
                </div>

                {locations.length === 0 ? (
                    <div className="p-6 text-gray-500 italic">Aucun lieu enregistré.</div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {locations.map((loc) => (
                            <li key={loc.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{loc.nom}</h3>
                                    {loc.adresse && <p className="text-gray-600 text-sm location-adresse">{loc.adresse}</p>}
                                    {loc.fraisSupplementaires > 0 && (
                                        <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                            + {loc.fraisSupplementaires} DH frais
                                        </span>
                                    )}
                                </div>
                                <DeleteLocationButton id={loc.id} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
