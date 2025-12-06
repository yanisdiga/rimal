import { PrismaClient } from '@prisma/client';
import { AddLocationForm, DeleteLocationButton } from './forms';
import { AdminLayout } from '../components/AdminLayout';

const prisma = new PrismaClient();

export default async function LocationsPage() {
    const locations = await prisma.location.findMany({
        orderBy: {
            nom: 'asc',
        },
    });

    return (
        <AdminLayout title="Gestion des Lieux">
            <div className="admin-form-container">
                <h2 className="locations-title">Ajouter un Lieu</h2>
                <AddLocationForm />
            </div>

            <div className="data-grid">
                <h2 className="locations-subtitle">Lieux Enregistrés ({locations.length})</h2>

                {locations.length === 0 ? (
                    <p className="locations-empty">Aucun lieu enregistré.</p>
                ) : (
                    locations.map((loc) => (
                        <div key={loc.id} className="data-item">
                            <div className="data-item-content">
                                <div className="data-info">
                                    <h3>{loc.nom}</h3>
                                    {loc.adresse && <p>{loc.adresse}</p>}
                                    {loc.fraisSupplementaires > 0 && (
                                        <span className="location-fees-badge">
                                            + {loc.fraisSupplementaires} DH frais
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="data-actions">
                                <DeleteLocationButton id={loc.id} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}
