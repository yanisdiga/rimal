import React from 'react';
import Link from 'next/link';

export default function SuccessPage() {
    return (
        <div style={{ paddingTop: '150px', minHeight: '80vh', textAlign: 'center' }}>
            <div className="container">
                <div style={{
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '2rem',
                    borderRadius: '8px',
                    maxWidth: '600px',
                    margin: '0 auto',
                    border: '1px solid #c3e6cb'
                }}>
                    <i className="fas fa-check-circle" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                    <h1 style={{ marginBottom: '1rem' }}>Réservation Confirmée !</h1>
                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                        Votre demande de réservation a bien été enregistrée.
                        Notre équipe vous contactera très prochainement pour confirmer les détails.
                    </p>
                    <Link href="/" style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        backgroundColor: '#155724',
                        color: 'white',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}>
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
