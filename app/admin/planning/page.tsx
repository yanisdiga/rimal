export const dynamic = 'force-dynamic';

import { PrismaClient } from '@prisma/client';
import { AdminLayout } from '../components/AdminLayout';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay, isWithinInterval, parseISO, isWeekend } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function PlanningPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedSearchParams = await searchParams;
    const startDateParam = typeof resolvedSearchParams.startDate === 'string' ? resolvedSearchParams.startDate : undefined;

    // Determine the start date of the MONTH view
    const today = new Date();
    // Default to current month start
    let viewDate = startOfMonth(today);

    if (startDateParam) {
        try {
            viewDate = startOfMonth(parseISO(startDateParam));
        } catch (e) {
            // If invalid, fallback
        }
    }

    const viewEnd = endOfMonth(viewDate);
    const days = eachDayOfInterval({ start: viewDate, end: viewEnd });

    // Navigation handlers
    const prevMonth = subMonths(viewDate, 1);
    const nextMonth = addMonths(viewDate, 1);
    const prevMonthUrl = `/admin/planning?startDate=${format(prevMonth, 'yyyy-MM-dd')}`;
    const nextMonthUrl = `/admin/planning?startDate=${format(nextMonth, 'yyyy-MM-dd')}`;
    const currentMonthUrl = `/admin/planning?startDate=${format(startOfMonth(today), 'yyyy-MM-dd')}`;

    // Fetch Data
    const vehicles = await prisma.vehicule.findMany({
        where: {
            statut: { not: 'RETIRE' }
        },
        include: {
            modele: true
        },
        orderBy: {
            modele: {
                nom: 'asc'
            }
        }
    });

    const reservations = await prisma.reservation.findMany({
        where: {
            status: { not: 'CANCELLED' },
            AND: [
                { dateDebut: { lte: viewEnd } },
                { dateFin: { gte: viewDate } }
            ]
        }
    });

    const getReservationForVehicleAndDay = (vehicleId: number, day: Date) => {
        return reservations.find(r =>
            r.vehiculeId === vehicleId &&
            isWithinInterval(day, { start: r.dateDebut, end: r.dateFin })
        );
    };

    return (
        <AdminLayout title="Planning Mensuel">
            <div className="planning-controls">
                <div className="planning-nav">
                    <Link href={prevMonthUrl} className="btn-secondary btn-sm">
                        <i className="fas fa-chevron-left"></i> Mois Préc.
                    </Link>
                    <span className="current-week-label">
                        {format(viewDate, 'MMMM yyyy', { locale: fr })}
                    </span>
                    <Link href={nextMonthUrl} className="btn-secondary btn-sm">
                        Mois Suiv. <i className="fas fa-chevron-right"></i>
                    </Link>
                </div>
                <Link href={currentMonthUrl} className="btn-secondary btn-sm">
                    Ce mois
                </Link>
            </div>

            <div className="planning-container">
                <div className="planning-grid" style={{ gridTemplateColumns: `minmax(200px, auto) repeat(${days.length}, minmax(40px, 1fr))` }}>
                    {/* Header Row */}
                    <div className="planning-header-cell empty-corner">Véhicule</div>
                    {days.map(day => (
                        <div key={day.toISOString()} className={`planning-header-cell day-header ${isSameDay(day, today) ? 'today' : ''} ${isWeekend(day) ? 'weekend' : ''}`}>
                            <span className="day-name">{format(day, 'EEE', { locale: fr })}</span>
                            <span className="day-number">{format(day, 'd', { locale: fr })}</span>
                        </div>
                    ))}

                    {/* Rows */}
                    {vehicles.map(vehicle => (
                        <>
                            <div key={`v-${vehicle.id}`} className="planning-row-header">
                                <span className="vehicle-name">{vehicle.modele.nom}</span>
                                <span className="vehicle-plaque">{vehicle.plaque}</span>
                            </div>

                            {days.map(day => {
                                const res = getReservationForVehicleAndDay(vehicle.id, day);
                                const isStart = res ? isSameDay(day, res.dateDebut) : false;
                                const isEnd = res ? isSameDay(day, res.dateFin) : false;

                                return (
                                    <div
                                        key={`cell-${vehicle.id}-${day.toISOString()}`}
                                        className={`planning-cell ${res ? 'occupied' : ''} ${isStart ? 'res-start' : ''} ${isEnd ? 'res-end' : ''} ${res ? res.status.toLowerCase() : ''} ${isWeekend(day) ? 'weekend-cell' : ''}`}
                                        title={res ? `${res.clientPrenom} ${res.clientNom} (${res.status})` : ''}
                                    >
                                        {/* Only show label on start date or first of month if overlapping */}
                                        {res && (isStart || isSameDay(day, viewDate)) && (
                                            <span className="cell-label">
                                                {res.clientNom}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </>
                    ))}
                </div>
            </div>

            {vehicles.length === 0 && (
                <p className="reservations-empty">Aucun véhicule actif à afficher.</p>
            )}
        </AdminLayout>
    );
}
