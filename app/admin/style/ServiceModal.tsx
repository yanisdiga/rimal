'use client';

import { useState, useEffect } from 'react';
import { createService, updateService } from '../services/actions';

interface ServiceItem {
    id: number;
    icon: string;
    title: string;
    description: string;
}

interface ServiceModalProps {
    service?: ServiceItem; // If present, edit mode
    trigger?: React.ReactNode;
}

import { createPortal } from 'react-dom';

export function ServiceModal({ service, trigger }: ServiceModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isEdit = !!service;

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        try {
            if (isEdit && service) {
                await updateService(service.id, formData);
            } else {
                await createService(formData);
            }
            setIsOpen(false);
        } catch (error) {
            console.error(error);
            alert('Erreur lors de l’enregistrement');
        } finally {
            setIsLoading(false);
        }
    };

    const modalContent = (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{isEdit ? 'Modifier le Service' : 'Ajouter un Service'}</h3>
                    <button className="close-button" onClick={() => setIsOpen(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <form action={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Titre</label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={service?.title}
                            required
                            placeholder="Ex: Kilométrage Illimité"
                        />
                    </div>

                    <div className="form-group">
                        <label>Icône (FontAwesome)</label>
                        <input
                            type="text"
                            name="icon"
                            defaultValue={service?.icon}
                            required
                            placeholder="Ex: fa-road"
                        />
                        <small style={{ display: 'block', marginTop: '5px', color: '#666', fontSize: '0.8rem' }}>
                            Utilisez des classes <a href="https://fontawesome.com/icons" target="_blank" style={{ textDecoration: 'underline' }}>FontAwesome</a>
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            defaultValue={service?.description}
                            required
                            placeholder="Description courte..."
                        ></textarea>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Enregistrement...' : (isEdit ? 'Mettre à jour' : 'Ajouter')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <>
            {trigger ? (
                <div onClick={() => setIsOpen(true)}>{trigger}</div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn-submit"
                    style={{ width: 'auto', marginBottom: '1rem' }}
                >
                    <i className="fas fa-plus"></i> Ajouter un Service
                </button>
            )}

            {isOpen && mounted && createPortal(modalContent, document.body)}
        </>
    );
}
