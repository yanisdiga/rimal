'use client';

import { createModel, createVehicle, deleteModel, deleteVehicle, updateVehicleStatus } from '@/app/actions/admin';
import { StatutVehicule, Transmission, FuelType } from '@prisma/client';
import { useRef } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitModelButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="btn-primary"
            style={{ width: '100%', marginTop: '20px' }}
        >
            {pending ? 'Création en cours...' : 'Créer le Modèle'}
        </button>
    );
}

function SubmitVehicleButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="btn-primary"
            style={{ height: '42px', marginTop: 'auto' }}
        >
            {pending ? '...' : 'Ajouter'}
        </button>
    );
}

export function AddModelForm() {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form
            action={async (formData) => {
                await createModel(formData);
                formRef.current?.reset();
            }}
            ref={formRef}
            className="admin-form-container"
            style={{ padding: '0', boxShadow: 'none', margin: '0' }}
        >
            <div className="form-row">
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Nom du Modèle</label>
                    <input name="nom" required type="text" placeholder="Ex: Renault Clio 5" />
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Prix par Jour (DH)</label>
                    <input name="prixParJour" required type="number" />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Image URL</label>
                    <input name="imageUrl" type="text" placeholder="https://..." />
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Nombre de Places</label>
                    <input name="nbPlaces" required type="number" defaultValue={5} />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Transmission</label>
                    <select name="transmission">
                        {Object.values(Transmission).map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Carburant</label>
                    <select name="fuelType">
                        {Object.values(FuelType).map((f) => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Description</label>
                <textarea
                    name="description"
                    rows={3}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }}
                ></textarea>
            </div>

            <SubmitModelButton />
        </form>
    );
}

export function AddVehicleForm({ modeleId }: { modeleId: number }) {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form
            action={async (formData) => {
                await createVehicle(formData);
                formRef.current?.reset();
            }}
            ref={formRef}
            style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}
        >
            <input type="hidden" name="modeleId" value={modeleId} />
            <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '10px', color: '#555' }}>Ajouter un véhicule au stock</h4>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem', color: '#666' }}>Plaque</label>
                    <input name="plaque" required type="text" placeholder="AA-123-AA" style={{ padding: '8px' }} />
                </div>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem', color: '#666' }}>Statut Initial</label>
                    <select name="statut" style={{ padding: '8px' }}>
                        {Object.values(StatutVehicule).map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                <SubmitVehicleButton />
            </div>
        </form>
    );
}

export function VehicleItem({ vehicle }: { vehicle: any }) {
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'DISPONIBLE': return 'available';
            case 'MAINTENANCE': return 'unavailable';
            case 'LOUE': return 'unavailable'; // Or another color if you prefer
            case 'RETIRE': return 'retired';
            default: return '';
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #eee', borderRadius: '6px', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1rem' }}>{vehicle.plaque}</span>
                <span className={`status-badge ${getStatusClass(vehicle.statut)}`}>
                    {vehicle.statut}
                </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <select
                    defaultValue={vehicle.statut}
                    onChange={(e) => updateVehicleStatus(vehicle.id, e.target.value as StatutVehicule)}
                    style={{ padding: '5px', fontSize: '0.8rem', width: 'auto' }}
                >
                    {Object.values(StatutVehicule).map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <button
                    onClick={() => deleteVehicle(vehicle.id)}
                    className="btn-danger"
                    style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
}

export function DeleteModelButton({ id }: { id: number }) {
    return (
        <button
            onClick={() => deleteModel(id)}
            className="btn-danger"
        >
            Supprimer le modèle
        </button>
    )
}
