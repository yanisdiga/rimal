import React from 'react';
import Link from 'next/link';
import { AdminLayout } from './components/AdminLayout';

export default function AdminDashboard() {
    return (
        <AdminLayout title="Tableau de Bord">
            <div className="dashboard-grid">
                <Link href="/admin/vehicles" className="dashboard-card">
                    <div>
                        <h3>Gestion des Véhicules</h3>
                        <p>Ajoutez des modèles, gérez le stock et les statuts des véhicules.</p>
                    </div>
                    <span className="card-link">Gérer les véhicules &rarr;</span>
                </Link>

                <Link href="/admin/locations" className="dashboard-card">
                    <div>
                        <h3>Lieux de Retrait</h3>
                        <p>Configurez les agences et points de retrait disponibles.</p>
                    </div>
                    <span className="card-link">Gérer les lieux &rarr;</span>
                </Link>

                <div className="dashboard-card disabled">
                    <div>
                        <h3>Réservations</h3>
                        <p>Visualisez et gérez les réservations clients (À venir).</p>
                    </div>
                    <span className="card-link">Bientôt disponible</span>
                </div>
            </div>
        </AdminLayout>
    );
}
