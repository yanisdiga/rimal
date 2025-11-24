import { PrismaClient } from '@prisma/client';
import { AddModelForm, AddVehicleForm, VehicleItem, DeleteModelButton } from './forms';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function VehiclesPage() {
    const modeles = await prisma.modeleVoiture.findMany({
        include: {
            vehicules: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className="admin-vehicles-container">
            <Link href="/admin" className="back-button menu-item-link">Retour</Link>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestion de la Flotte</h1>

            <AddModelForm />

            <div className="actual-vehicles">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Modèles Existants ({modeles.length})</h2>

                {modeles.length === 0 ? (
                    <p className="text-gray-500 italic">Aucun modèle de voiture n'a été ajouté.</p>
                ) : (
                    <div className="actual-vehicles-list">
                        {modeles.map((modele) => (
                            <div key={modele.id} className="vehicle-item">
                                <div className="vehicle-item-header">
                                    <div className="vehicle-item-header-left">
                                        {modele.imageUrl && (
                                            <img src={modele.imageUrl} alt={modele.nom} />
                                        )}
                                        <div className="flex-1 text-center">
                                            <h3 className="text-xl font-bold text-gray-800">{modele.nom}</h3>
                                            <p className="text-sm text-gray-600">{modele.transmission} • {modele.fuelType} • {modele.nbPlaces} places</p>
                                            <p className="text-sm font-semibold text-blue-600">{modele.prixParJour} DH / jour</p>
                                        </div>
                                    </div>
                                    <div className="vehicle-item-header-right">
                                        <DeleteModelButton id={modele.id} />
                                    </div>
                                </div>

                                <div className="vehicle-item-body">
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Véhicules en Stock ({modele.vehicules.length})</h4>

                                    {modele.vehicules.length === 0 ? (
                                        <p className="text-sm text-gray-400 mb-4">Aucun véhicule physique enregistré pour ce modèle.</p>
                                    ) : (
                                        <div className="vehicle-item-body-list">
                                            {modele.vehicules.map((v) => (
                                                <VehicleItem key={v.id} vehicle={v} />
                                            ))}
                                        </div>
                                    )}

                                    <AddVehicleForm modeleId={modele.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
