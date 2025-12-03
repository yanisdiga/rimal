'use client';

import { useState } from 'react';
import { ModeleVoiture, Vehicule } from '@prisma/client';
import { EditModelForm } from './[id]/edit/EditModelForm';
import { DeleteModelButton, AddVehicleForm, VehicleItem } from './forms';

interface VehicleModelRowProps {
    modele: ModeleVoiture & { vehicules: Vehicule[] };
}

export function VehicleModelRow({ modele }: VehicleModelRowProps) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="data-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {modele.imageUrl && (
                        <img src={modele.imageUrl} alt={modele.nom} style={{ width: '100px', height: '60px', objectFit: 'contain' }} />
                    )}
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{modele.nom}</h3>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                            {modele.transmission} • {modele.fuelType} • {modele.nbPlaces} places • <span style={{ color: '#1a1a1a', fontWeight: 'bold' }}>{modele.prixParJour} DH/jour</span>
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="btn-primary"
                        style={{ padding: '8px 15px', fontSize: '0.9rem' }}
                    >
                        {isEditing ? 'Fermer' : 'Modifier'}
                    </button>
                    <DeleteModelButton id={modele.id} />
                </div>
            </div>

            {isEditing && (
                <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
                    <h4 style={{ marginBottom: '15px', fontFamily: 'Anton, sans-serif' }}>Modifier le Modèle</h4>
                    <EditModelForm modele={modele} onSuccess={() => setIsEditing(false)} />
                </div>
            )}

            <div style={{ paddingLeft: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Véhicules en Stock ({modele.vehicules.length})
                </h4>

                {modele.vehicules.length === 0 ? (
                    <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '15px' }}>Aucun véhicule physique enregistré.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
                        {modele.vehicules.map((v) => (
                            <VehicleItem key={v.id} vehicle={v} />
                        ))}
                    </div>
                )}

                <AddVehicleForm modeleId={modele.id} />
            </div>
        </div>
    );
}
