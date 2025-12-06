'use client';

import { useState } from 'react';
import { Location, Reservation } from '@prisma/client';
import { updateReservationDetails } from '../../actions/updateReservationDetails';
import { format } from 'date-fns';

interface EditReservationModalProps {
    reservation: Reservation;
    locations: Location[];
}

export function EditReservationModal({ reservation, locations }: EditReservationModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [dateDebut, setDateDebut] = useState(new Date(reservation.dateDebut).toISOString().slice(0, 16));
    const [dateFin, setDateFin] = useState(new Date(reservation.dateFin).toISOString().slice(0, 16));
    const [lieuPriseEnChargeId, setLieuPriseEnChargeId] = useState(reservation.lieuPriseEnChargeId);
    const [lieuRetourId, setLieuRetourId] = useState(reservation.lieuRetourId);
    const [prixTotal, setPrixTotal] = useState(reservation.prixTotal);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await updateReservationDetails(reservation.id, {
            dateDebut: new Date(dateDebut),
            dateFin: new Date(dateFin),
            lieuPriseEnChargeId: Number(lieuPriseEnChargeId),
            lieuRetourId: Number(lieuRetourId),
            prixTotal: Number(prixTotal),
        });

        setIsLoading(false);
        if (result.success) {
            setIsOpen(false);
        } else {
            alert('Erreur lors de la mise à jour');
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="btn-secondary btn-edit-reservation"
            >
                Modifier
            </button>
        );
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="modal-title">Modifier la Réservation #{reservation.id}</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="modal-label">Date de Début</label>
                        <input
                            type="datetime-local"
                            value={dateDebut}
                            onChange={(e) => setDateDebut(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="modal-label">Date de Fin</label>
                        <input
                            type="datetime-local"
                            value={dateFin}
                            onChange={(e) => setDateFin(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="modal-label">Lieu de Départ</label>
                        <select
                            value={lieuPriseEnChargeId}
                            onChange={(e) => setLieuPriseEnChargeId(Number(e.target.value))}
                            required
                        >
                            {locations.map(loc => (
                                <option key={loc.id} value={loc.id}>{loc.nom}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="modal-label">Lieu de Retour</label>
                        <select
                            value={lieuRetourId}
                            onChange={(e) => setLieuRetourId(Number(e.target.value))}
                            required
                        >
                            {locations.map(loc => (
                                <option key={loc.id} value={loc.id}>{loc.nom}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="modal-label">Prix Total (MAD)</label>
                        <input
                            type="number"
                            value={prixTotal}
                            onChange={(e) => setPrixTotal(Number(e.target.value))}
                            required
                            min="0"
                        />
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="btn-secondary"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary"
                        >
                            {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
