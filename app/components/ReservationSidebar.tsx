"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Location } from '@prisma/client';
import { format } from 'date-fns';
import { DateRangeSelector } from './DateRangeSelector';
import '../../styles/reservation.css'; // Ensure we have access to styles, though ideally they are global or module

interface ReservationSidebarProps {
    locations: Location[];
    className?: string;
}

const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00"
];

export function ReservationSidebar({ locations, className }: ReservationSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // --- State for Search Params ---
    const [pickupLocationId, setPickupLocationId] = useState(searchParams.get('location') || '');
    const [returnLocationId, setReturnLocationId] = useState(searchParams.get('returnLocation') || '');

    // Date/Time State
    const [startDate, setStartDate] = useState<Date | undefined>(
        searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined
    );
    const [endDate, setEndDate] = useState<Date | undefined>(
        searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined
    );

    const [startTime, setStartTime] = useState(searchParams.get('startTime') || '10:00');
    const [returnTime, setReturnTime] = useState(searchParams.get('returnTime') || '10:00');

    // --- State for Filters ---
    const [transmission, setTransmission] = useState<string[]>([]);

    useEffect(() => {
        const t = searchParams.get('transmission');
        if (t) {
            setTransmission(t.split(','));
        } else {
            setTransmission([]);
        }
    }, [searchParams]);

    // --- Handlers ---

    const handleSearchUpdate = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (pickupLocationId) params.set('location', pickupLocationId);
        else params.delete('location');

        if (returnLocationId) params.set('returnLocation', returnLocationId);
        else params.delete('returnLocation');

        if (startDate) params.set('startDate', format(startDate, 'yyyy-MM-dd'));
        else params.delete('startDate');

        if (endDate) params.set('endDate', format(endDate, 'yyyy-MM-dd'));
        else params.delete('endDate');

        if (startTime) params.set('startTime', startTime);
        if (returnTime) params.set('returnTime', returnTime);

        router.push(`/reservation?${params.toString()}`);
    };

    const handleFilterChange = (type: 'transmission', value: string) => {
        let newValues = [...transmission];
        if (newValues.includes(value)) {
            newValues = newValues.filter(v => v !== value);
        } else {
            newValues.push(value);
        }
        setTransmission(newValues);

        const params = new URLSearchParams(searchParams.toString());
        if (newValues.length > 0) {
            params.set(type, newValues.join(','));
        } else {
            params.delete(type);
        }
        router.push(`/reservation?${params.toString()}`);
    };

    return (
        <aside className={`reservation-sidebar ${className || ''}`}>

            {/* --- Block 1: Modifier la recherche --- */}
            <div className="sidebar-block search-modifier">
                <h3 className="sidebar-title">Modifier la recherche</h3>

                <div className="form-group">
                    <label>Retrait</label>
                    <select
                        value={pickupLocationId}
                        onChange={(e) => setPickupLocationId(e.target.value)}
                    >
                        <option value="">Choisir un lieu...</option>
                        {locations.map(loc => (
                            <option key={loc.id} value={loc.id}>{loc.nom}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Retour</label>
                    <select
                        value={returnLocationId}
                        onChange={(e) => setReturnLocationId(e.target.value)}
                    >
                        <option value="">Même que le retrait</option>
                        {locations.map(loc => (
                            <option key={loc.id} value={loc.id}>{loc.nom}</option>
                        ))}
                    </select>
                </div>

                {/* New Date Selector in Sidebar */}
                <div className="form-group sidebar-date-selector">
                    <DateRangeSelector
                        startDate={startDate}
                        endDate={endDate}
                        onDateChange={(range) => {
                            setStartDate(range.from);
                            setEndDate(range.to);
                        }}
                        startTime={startTime}
                        returnTime={returnTime}
                        onStartTimeChange={setStartTime}
                        onReturnTimeChange={setReturnTime}
                        hours={timeSlots}
                        className="sidebar-style" // Optional: for specific overrides
                        numberOfMonths={1}
                    />
                </div>

                <button className="update-search-btn" onClick={handleSearchUpdate}>
                    Rechercher
                </button>
            </div>

            {/* --- Block 2: Filtres --- */}
            <div className="sidebar-block filters-block">
                <h3 className="sidebar-title">Filtres</h3>

                <div className="filter-group">
                    <h4>Transmission</h4>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={transmission.includes('MANUELLE')}
                            onChange={() => handleFilterChange('transmission', 'MANUELLE')}
                        />
                        <span>Manuelle</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={transmission.includes('AUTOMATIQUE')}
                            onChange={() => handleFilterChange('transmission', 'AUTOMATIQUE')}
                        />
                        <span>Automatique</span>
                    </label>
                </div>
            </div>

        </aside>
    );
}
