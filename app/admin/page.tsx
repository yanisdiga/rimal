export default function AdminDashboard() {
    return (
        <div className="admin-container">
            <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
            <p className="text-gray-600">Bienvenue dans l'interface d'administration de Rimal Car Rental.</p>

            <div className="menu-container">
                <div className="menu-item">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Gestion des Véhicules</h3>
                    <p className="text-gray-500 mb-4 flex-1">Ajoutez des modèles, gérez le stock et les statuts des véhicules.</p>
                    <a href="/admin/vehicles" className="menu-item-link">
                        Gérer les véhicules
                    </a>
                </div>

                <div className="menu-item">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Lieux de Retrait</h3>
                    <p className="text-gray-500 mb-4 flex-1">Configurez les agences et points de retrait disponibles.</p>
                    <a href="/admin/locations" className="menu-item-link">
                        Gérer les lieux
                    </a>
                </div>

                <div className="menu-item">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Réservations</h3>
                    <p className="text-gray-500 mb-4 flex-1">Visualisez et gérez les réservations clients (À venir).</p>
                    <span className="menu-item-link disabled">
                        Bientôt disponible
                    </span>
                </div>
            </div>
        </div>
    );
}
