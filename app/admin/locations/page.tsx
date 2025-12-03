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
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', fontFamily: 'Anton, sans-serif' }}>Ajouter un Lieu</h2>
                <AddLocationForm />
            </div>

            <div className="data-grid">
                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', fontFamily: 'Anton, sans-serif' }}>Lieux Enregistrés ({locations.length})</h2>

                {locations.length === 0 ? (
                    <p style={{ color: '#888', fontStyle: 'italic' }}>Aucun lieu enregistré.</p>
                ) : (
                    locations.map((loc) => (
                        <div key={loc.id} className="data-item">
                            <div className="data-item-content">
                                <div className="data-info">
                                    <h3>{loc.nom}</h3>
                                    {loc.adresse && <p>{loc.adresse}</p>}
                                    {loc.fraisSupplementaires > 0 && (
                                        <span style={{ display: 'inline-block', marginTop: '5px', padding: '2px 8px', backgroundColor: '#fff9c4', color: '#fbc02d', borderRadius: '4px', fontSize: '0.8rem' }}>
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
