import React from 'react';
import Link from 'next/link';
import '../../../styles/success.css';
import { NavbarAndMenu } from '../../components/Menu';
import { prisma } from '@/lib/prisma';

export default async function SuccessPage() {
    const voitures = await prisma.modeleVoiture.findMany();
    return (
        <>
            <NavbarAndMenu voitures={voitures} />
            <div className="success-layout">
                <div className="success-modal">
                    <div className="checkmark-container">
                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </div>

                    <h1 className="success-title">Réservation Confirmée !</h1>

                    <p className="success-message">
                        Votre demande a été enregistrée avec succès.<br />
                        Notre équipe vous contactera très prochainement pour finaliser les détails de votre location.
                    </p>

                    <Link href="/" className="btn-home">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </>
    );
}
