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
            className="menu-item-link"
        >
            {pending ? (
                <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Création en cours...
                </>
            ) : (
                'Créer le Lieu'
            )}
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
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8"
        >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Ajouter un Lieu de Retrait</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nom du Lieu</label>
                    <input name="nom" required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" placeholder="Ex: Aéroport Marrakech" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Frais Supplémentaires (DH)</label>
                    <input name="fraisSupplementaires" type="number" defaultValue={0} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Adresse (Optionnel)</label>
                    <input name="adresse" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" placeholder="Adresse complète..." />
                </div>
            </div>
            <SubmitLocationButton />
        </form>
    );
}

export function DeleteLocationButton({ id }: { id: number }) {
    return (
        <button
            onClick={() => deleteLocation(id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
            Supprimer
        </button>
    );
}
