'use client';

import { createLocation, deleteLocation } from '@/app/actions/admin';
import { useRef } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitLocationButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="btn-primary"
            style={{ width: '100%', marginTop: '20px' }}
        >
            {pending ? 'Création en cours...' : 'Créer le Lieu'}
        </button>
    );
}

export function AddLocationForm() {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form
            action={async (formData) => {
                await createLocation(formData);
                formRef.current?.reset();
            }}
            ref={formRef}
            className="admin-form-container compact"
        >
            <div className="form-row">
                <div className="form-group">
                    <label className="form-label">Nom du Lieu</label>
                    <input name="nom" required type="text" placeholder="Ex: Aéroport Marrakech" />
                </div>
                <div className="form-group">
                    <label className="form-label">Frais Supplémentaires (DH)</label>
                    <input name="fraisSupplementaires" type="number" defaultValue={0} />
                </div>
            </div>
            <div className="form-group">
                <label className="form-label">Adresse (Optionnel)</label>
                <input name="adresse" type="text" placeholder="Adresse complète..." />
            </div>
            <SubmitLocationButton />
        </form>
    );
}

export function DeleteLocationButton({ id }: { id: number }) {
    return (
        <button
            onClick={() => deleteLocation(id)}
            className="btn-danger"
        >
            Supprimer
        </button>
    );
}
