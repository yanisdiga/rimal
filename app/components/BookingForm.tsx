"use client";

import React, { useState, useRef, useEffect } from 'react';
import { createReservation } from '../actions/createReservation';
import { Location } from '@prisma/client';

interface BookingFormProps {
    modelId: number;
    modelName: string;
    modelImageUrl: string | null;
    searchParams: { [key: string]: string | string[] | undefined };
    locations: Location[];
    pricePerDay: number;
}

// ... imports
import { DateRangeSelector } from './DateRangeSelector';
import { DateRange } from 'react-day-picker';

// ... (keep BookingFormProps)

// Remove DayPicker imports
import { format } from 'date-fns';
// ...

// Remove useClickOutside hook if not used elsewhere (it was used for time pickers, but DateRangeSelector handles that now)
// Actually, check if DateRangeSelector is handling time entirely. 
// Yes, DateRangeSelector takes startTime, returnTime, and their handlers.
// So we can remove useClickOutside and timeSlots from here as well, passing timeSlots if needed or letting DateRangeSelector use its default.
// The Plan said "Pass timeSlots". DateRangeSelector has a default, but let's see.
// DateRangeSelector accepts `hours` prop.
// So we will remove useClickOutside from here.

const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00"
];

export function BookingForm({ modelId, modelName, modelImageUrl, searchParams, locations, pricePerDay }: BookingFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // State for dates
    const initialStartDate = searchParams.startDate ? new Date(searchParams.startDate as string) : undefined;
    const initialEndDate = searchParams.endDate ? new Date(searchParams.endDate as string) : undefined;

    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
        from: initialStartDate,
        to: initialEndDate,
    });

    const [startTime, setStartTime] = useState(searchParams.startTime as string || '10:00');
    const [returnTime, setReturnTime] = useState(searchParams.returnTime as string || '10:00');

    // State for locations to calculate fees
    const [locationId, setLocationId] = useState<string>(searchParams.location as string || '');
    const [returnLocationId, setReturnLocationId] = useState<string>(searchParams.returnLocation as string || '');

    // Calculate total price
    const calculateTotal = () => {
        if (!selectedRange?.from || !selectedRange?.to) return { total: 0, days: 0, locFees: 0 };
        const start = new Date(`${format(selectedRange.from, 'yyyy-MM-dd')}T${startTime}`);
        const end = new Date(`${format(selectedRange.to, 'yyyy-MM-dd')}T${returnTime}`);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) return { total: 0, days: 0, locFees: 0 };

        const diffTime = end.getTime() - start.getTime();
        if (diffTime <= 0) return { total: 0, days: 0, locFees: 0 };

        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let total = diffDays * pricePerDay;
        // Calculation logic strictly mirroring server action
        let locFees = 0;

        if (locationId) {
            const loc = locations.find(l => l.id.toString() === locationId);
            if (loc) locFees += loc.fraisSupplementaires;
        }

        // Determine effective return ID logic
        const effectiveReturnId = returnLocationId
            ? returnLocationId
            : (!searchParams.customReturnLocation && !searchParams.customLocation && locationId)
                ? locationId
                : null;

        if (effectiveReturnId) {
            const loc = locations.find(l => l.id.toString() === effectiveReturnId);
            if (loc) locFees += loc.fraisSupplementaires;
        }

        total += locFees;

        return { total, days: diffDays, locFees };
    };

    const calculation = calculateTotal();
    const { total: totalPrice, days, locFees } = calculation;

    async function handleSubmit(formData: FormData) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsSubmitting(true);
        setError(null);

        const result = await createReservation(formData);

        if (result?.error) {
            setError(result.error);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="booking-layout">
            <div className="form-column">
                <form action={handleSubmit} className="booking-form">
                    <input type="hidden" name="modelId" value={modelId} />
                    <input type="hidden" name="startDate" value={selectedRange?.from ? format(selectedRange.from, 'yyyy-MM-dd') : ''} />
                    <input type="hidden" name="endDate" value={selectedRange?.to ? format(selectedRange.to, 'yyyy-MM-dd') : ''} />
                    <input type="hidden" name="startTime" value={startTime} />
                    <input type="hidden" name="returnTime" value={returnTime} />

                    <div className="booking-form-section">
                        <h3>Dates de réservation</h3>
                        <div className="form-group full-width">
                            <DateRangeSelector
                                startDate={selectedRange?.from}
                                endDate={selectedRange?.to}
                                onDateChange={setSelectedRange}
                                startTime={startTime}
                                returnTime={returnTime}
                                onStartTimeChange={setStartTime}
                                onReturnTimeChange={setReturnTime}
                                hours={timeSlots}
                                numberOfMonths={2}
                                className="booking-style"
                            />
                        </div>
                    </div>


                    <div className="booking-form-section">
                        <h3>Lieux</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="locationId">Lieu de départ *</label>
                                <select
                                    id="locationId"
                                    name="locationId"
                                    value={locationId}
                                    onChange={(e) => setLocationId(e.target.value)}
                                    required={!searchParams.customLocation}
                                    disabled={!!searchParams.customLocation}
                                >
                                    <option value="">
                                        {searchParams.customLocation ? `(Personnalisé: ${searchParams.customLocation})` : 'Sélectionnez un lieu'}
                                    </option>
                                    {locations.map((loc) => (
                                        <option key={loc.id} value={loc.id}>
                                            {loc.nom} (+{loc.fraisSupplementaires} DH)
                                        </option>
                                    ))}
                                </select>
                                {searchParams.customLocation && (
                                    <input type="hidden" name="customLocation" value={searchParams.customLocation as string} />
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="returnLocationId">Lieu de retour *</label>
                                <select
                                    id="returnLocationId"
                                    name="returnLocationId"
                                    value={returnLocationId}
                                    onChange={(e) => setReturnLocationId(e.target.value)}
                                    required={!searchParams.customReturnLocation && !searchParams.customLocation}
                                    disabled={!!searchParams.customReturnLocation || !!searchParams.customLocation}
                                >
                                    <option value="">
                                        {searchParams.customReturnLocation
                                            ? `(Personnalisé: ${searchParams.customReturnLocation})`
                                            : (searchParams.customLocation ? '(Même endroit que le départ)' : 'Sélectionnez un lieu')}
                                    </option>
                                    {locations.map((loc) => (
                                        <option key={loc.id} value={loc.id}>
                                            {loc.nom} (+{loc.fraisSupplementaires} DH)
                                        </option>
                                    ))}
                                </select>
                                {searchParams.customReturnLocation && (
                                    <input type="hidden" name="customReturnLocation" value={searchParams.customReturnLocation as string} />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="booking-form-section">
                        <h3>Vos coordonnées</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="lastName">Nom *</label>
                                <input type="text" id="lastName" name="lastName" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName">Prénom *</label>
                                <input type="text" id="firstName" name="firstName" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input type="email" id="email" name="email" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Téléphone *</label>
                                <input type="tel" id="phone" name="phone" required />
                            </div>
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Traitement...' : 'Confirmer la réservation'}
                    </button>
                </form>
            </div>

            <div className="summary-column">
                <div className="booking-summary-card">
                    <h3>Récapitulatif</h3>
                    {modelImageUrl && (
                        <img src={modelImageUrl} alt={modelName} />
                    )}
                    <div className="summary-details">
                        <h4>{modelName}</h4>
                        <div className="summary-row">
                            <span>Du :</span>
                            <strong>{selectedRange?.from ? format(selectedRange.from, 'dd/MM/yyyy') : '-'}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Au :</span>
                            <strong>{selectedRange?.to ? format(selectedRange.to, 'dd/MM/yyyy') : '-'}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Durée :</span>
                            <strong>{days} jours</strong>
                        </div>
                        {locFees > 0 && (
                            <div className="summary-row fees">
                                <span>Frais de lieu :</span>
                                <strong>+ {locFees} DH</strong>
                            </div>
                        )}
                        <div className="summary-total">
                            <span>Total estimé :</span>
                            <strong>{totalPrice} DH</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
