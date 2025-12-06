import { PrismaClient } from '@prisma/client';
import { AdminLayout } from '../components/AdminLayout';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ReservationActions } from './ReservationActions';
import { EditReservationModal } from './EditReservationModal';

const prisma = new PrismaClient();

export default async function ReservationsPage() {
    const reservations = await prisma.reservation.findMany({
        include: {
            vehicule: {
                include: {
                    modele: true,
                },
            },
            lieuPriseEnCharge: true,
            lieuRetour: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const locations = await prisma.location.findMany();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: 'MAD',
        }).format(price);
    };

    const formatDate = (date: Date) => {
        return format(date, 'dd MMM yyyy', { locale: fr });
    };

    const getStatusBadge = (status: string) => {
        let badgeClass = 'status-badge';

        switch (status) {
            case 'PENDING':
                badgeClass += ' pending';
                break;
            case 'CONFIRMED':
                badgeClass += ' confirmed';
                break;
            case 'REJECTED':
            case 'CANCELLED':
                badgeClass += ' cancelled';
                break;
            case 'COMPLETED':
                badgeClass += ' completed';
                break;
            default:
                badgeClass += ' pending';
        }

        return (
            <span className={badgeClass}>
                {status}
            </span>
        );
    };

    return (
        <AdminLayout title="Gestion des Réservations">
            <div className="data-grid">
                <h2 className="reservations-title">
                    Toutes les Réservations ({reservations.length})
                </h2>

                {reservations.length === 0 ? (
                    <p className="reservations-empty">Aucune réservation trouvée.</p>
                ) : (
                    <div className="data-grid">
                        {reservations.map((res) => (
                            <div key={res.id} className="data-item">
                                <div className="data-item-content">
                                    {/* Vehicle Image */}
                                    {res.vehicule.modele.imageUrl && (
                                        <img
                                            src={res.vehicule.modele.imageUrl}
                                            alt={res.vehicule.modele.nom}
                                        />
                                    )}

                                    {/* Reservation Info */}
                                    <div className="data-info" style={{ flex: 1 }}>
                                        <div className="reservation-header">
                                            <h3 className="reservation-title">
                                                {res.vehicule.modele.nom} <span className="reservation-subtitle">({res.vehicule.plaque})</span>
                                            </h3>
                                            <span className="reservation-price">{formatPrice(res.prixTotal)}</span>
                                        </div>

                                        <div className="reservation-details-grid">
                                            <div>
                                                <div className="info-row"><i className="fas fa-calendar-alt info-icon"></i> {formatDate(res.dateDebut)} - {formatDate(res.dateFin)}</div>
                                                <div className="info-row"><i className="fas fa-map-marker-alt info-icon"></i> {res.lieuPriseEnCharge.nom} <i className="fas fa-arrow-right reservation-arrow"></i> {res.lieuRetour.nom}</div>
                                            </div>
                                            <div>
                                                <div className="client-name">{res.clientPrenom} {res.clientNom}</div>
                                                <div className="info-row"><i className="fas fa-phone info-icon"></i> {res.clientTel}</div>
                                                <div className="info-row"><i className="fas fa-envelope info-icon"></i> {res.clientEmail}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="data-actions" style={{ flexDirection: 'column', alignItems: 'flex-end', gap: '10px', marginLeft: '20px' }}>
                                    {getStatusBadge(res.status)}
                                    <div className="action-buttons">
                                        <EditReservationModal reservation={res} locations={locations} />
                                        <ReservationActions id={res.id} currentStatus={res.status} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
