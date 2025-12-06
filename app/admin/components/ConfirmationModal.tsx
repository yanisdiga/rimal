'use client';

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export function ConfirmationModal({ isOpen, title, message, onConfirm, onCancel, isLoading = false }: ConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px' }}>
                <h3 className="modal-title">{title}</h3>
                <p style={{ marginBottom: '20px', color: '#555' }}>{message}</p>
                <div className="modal-actions">
                    <button
                        onClick={onCancel}
                        className="btn-secondary"
                        disabled={isLoading}
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Traitement...' : 'Confirmer'}
                    </button>
                </div>
            </div>
        </div>
    );
}
