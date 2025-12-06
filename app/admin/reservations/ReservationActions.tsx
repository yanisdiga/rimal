'use client';

import { updateReservationStatus } from '../../actions/updateReservationStatus';
import { StatusReservation } from '@prisma/client';
import { useState } from 'react';
import { useToast } from '../components/ToastContext';
import { ConfirmationModal } from '../components/ConfirmationModal';

interface ReservationActionsProps {
    id: number;
    currentStatus: StatusReservation;
}

export function ReservationActions({ id, currentStatus }: ReservationActionsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingStatus, setPendingStatus] = useState<StatusReservation | null>(null);
    const { showToast } = useToast();

    const initiateStatusChange = (status: StatusReservation) => {
        setPendingStatus(status);
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        if (!pendingStatus) return;

        setIsLoading(true);
        try {
            await updateReservationStatus(id, pendingStatus);
            showToast(`Statut mis à jour vers ${pendingStatus}`, 'success');
        } catch (error) {
            showToast('Erreur lors de la mise à jour du statut', 'error');
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
            setPendingStatus(null);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setPendingStatus(null);
    };

    return (
        <>
            <div className="action-buttons">
                {currentStatus !== 'CONFIRMED' && (
                    <button
                        onClick={() => initiateStatusChange('CONFIRMED')}
                        disabled={isLoading}
                        className="btn-success"
                        style={{ opacity: isLoading ? 0.7 : 1 }}
                        title="Confirmer la réservation"
                    >
                        <i className="fas fa-check"></i>
                    </button>
                )}

                {currentStatus !== 'CANCELLED' && (
                    <button
                        onClick={() => initiateStatusChange('CANCELLED')}
                        disabled={isLoading}
                        className="btn-danger"
                        style={{ opacity: isLoading ? 0.7 : 1 }}
                        title="Annuler la réservation"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                )}

                {currentStatus !== 'PENDING' && (
                    <button
                        onClick={() => initiateStatusChange('PENDING')}
                        disabled={isLoading}
                        className="btn-secondary"
                        style={{ opacity: isLoading ? 0.7 : 1, padding: '5px 10px', fontSize: '0.8rem' }}
                        title="Remettre en attente"
                    >
                        <i className="fas fa-clock"></i>
                    </button>
                )}
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                title="Confirmer le changement"
                message={`Êtes-vous sûr de vouloir changer le statut de cette réservation vers ${pendingStatus} ?`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                isLoading={isLoading}
            />
        </>
    );
}
