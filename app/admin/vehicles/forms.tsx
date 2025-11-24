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
            className="menu-item-link"
        >
            {pending ? (
                <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Création en cours...
                </>
            ) : (
                'Créer le Modèle'
            )}
        </button>
    );
}

function SubmitVehicleButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="menu-item-link add-vehicle-button"
        >
            {pending ? 'Validation...' : 'Valider l\'ajout'}
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
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8"
        >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Ajouter un Nouveau Modèle</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nom du Modèle</label>
                    <input name="nom" required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" placeholder="Ex: Renault Clio 5" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Prix par Jour (DH)</label>
                    <input name="prixParJour" required type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input name="imageUrl" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" placeholder="https://..." />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre de Places</label>
                    <input name="nbPlaces" required type="number" defaultValue={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Transmission</label>
                    <select name="transmission" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2">
                        {Object.values(Transmission).map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Carburant</label>
                    <select name="fuelType" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2">
                        {Object.values(FuelType).map((f) => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" rows={3}></textarea>
                </div>
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
            className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200"
        >
            <input type="hidden" name="modeleId" value={modeleId} />
            <h4 className="text-sm font-semibold mb-2 text-gray-700">Ajouter un véhicule au stock</h4>
            <div className="add-vehicle-container">
                <div className="add-vehicle-input">
                    <label className="block text-xs font-medium text-gray-500">Plaque d'immatriculation</label>
                    <input name="plaque" required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm" placeholder="12345-A-1" />
                </div>
                <div className="add-vehicle-select">
                    <label className="block text-xs font-medium text-gray-500">Statut Initial</label>
                    <select name="statut" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm">
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
    return (
        <div className="vehicle-item-personal">
            <div className="vehicle-item-personal-left">
                <span className="font-mono font-bold text-gray-800">{vehicle.plaque}</span>
                <span className={`vehicle-status-span ${vehicle.statut === 'DISPONIBLE' ? 'bg-green-100 text-green-800' :
                    vehicle.statut === 'MAINTENANCE' ? 'bg-red-100 text-red-800' :
                        vehicle.statut === 'LOUE' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                    }`}>
                    {vehicle.statut}
                </span>
            </div>
            <div className="vehicle-item-personal-right">
                <div className="vehicle-status">
                    <span className="block text-xs font-medium text-gray-500">Statut</span>
                    <select
                        defaultValue={vehicle.statut}
                        onChange={(e) => updateVehicleStatus(vehicle.id, e.target.value as StatutVehicule)}
                        className="text-xs border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border p-1"
                    >
                        {Object.values(StatutVehicule).map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={() => deleteVehicle(vehicle.id)}
                    className="vehicle-delete-button"
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
            className="vehicle-item-header-right"
        >
            Supprimer le modèle
        </button>
    )
}

