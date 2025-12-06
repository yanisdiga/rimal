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

import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

// Hook for clicking outside
function useClickOutside(ref: React.RefObject<any>, handler: () => void) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler();
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}

const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00"
];

export function BookingForm({ modelId, modelName, modelImageUrl, searchParams, locations, pricePerDay }: BookingFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // State for dates and times to calculate price
    // Initialize from searchParams if available
    const initialStartDate = searchParams.startDate ? new Date(searchParams.startDate as string) : undefined;
    const initialEndDate = searchParams.endDate ? new Date(searchParams.endDate as string) : undefined;

    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
        from: initialStartDate,
        to: initialEndDate,
    });

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const [startTime, setStartTime] = useState(searchParams.startTime as string || '10:00');
    const [returnTime, setReturnTime] = useState(searchParams.returnTime as string || '10:00');

    const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);
    const [isReturnTimeOpen, setIsReturnTimeOpen] = useState(false);

    const startTimeRef = useRef<HTMLDivElement>(null);
    const returnTimeRef = useRef<HTMLDivElement>(null);

    useClickOutside(startTimeRef, () => setIsStartTimeOpen(false));
    useClickOutside(returnTimeRef, () => setIsReturnTimeOpen(false));


    // Calculate total price
    const calculateTotal = () => {
        if (!selectedRange?.from || !selectedRange?.to) return 0;
        const start = new Date(`${format(selectedRange.from, 'yyyy-MM-dd')}T${startTime}`);
        const end = new Date(`${format(selectedRange.to, 'yyyy-MM-dd')}T${returnTime}`);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

        const diffTime = end.getTime() - start.getTime();
        if (diffTime <= 0) return 0;

        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays * pricePerDay;
    };

    const totalPrice = calculateTotal();
    const days = totalPrice > 0 ? Math.round(totalPrice / pricePerDay) : 0;

    const handleDateSelect = (range: DateRange | undefined) => {
        setSelectedRange(range);
        if (range?.from && range?.to) {
            setIsCalendarOpen(false);
        }
    };

    const handleStartTimeSelect = (hour: string) => {
        setStartTime(hour);
        setIsStartTimeOpen(false);
    };

    const handleReturnTimeSelect = (hour: string) => {
        setReturnTime(hour);
        setIsReturnTimeOpen(false);
    };

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        setError(null);

        const result = await createReservation(formData);

        if (result?.error) {
            setError(result.error);
            setIsSubmitting(false);
        }
        // If success, the server action will redirect
    }

    return (
        <div className="booking-layout">
            <div className="form-column">
                <form action={handleSubmit} className="booking-form">
                    <input type="hidden" name="modelId" value={modelId} />
                    {/* Hidden inputs for server action */}
                    <input type="hidden" name="startDate" value={selectedRange?.from ? format(selectedRange.from, 'yyyy-MM-dd') : ''} />
                    <input type="hidden" name="endDate" value={selectedRange?.to ? format(selectedRange.to, 'yyyy-MM-dd') : ''} />
                    <input type="hidden" name="startTime" value={startTime} />
                    <input type="hidden" name="returnTime" value={returnTime} />

                    <div className="booking-form-section">
                        <h3>Dates de réservation</h3>
                        <div className="form-grid">
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <label>Date de départ et de retour *</label>
                                <button
                                    type="button"
                                    className="choose-date-button"
                                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 15px',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        backgroundColor: '#fcfcfc',
                                        textAlign: 'left',
                                        fontFamily: 'Oswald, sans-serif',
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <span>
                                        {selectedRange?.from ? format(selectedRange.from, 'dd/MM/yyyy') : 'Sélectionner les dates'}
                                        {selectedRange?.to ? ` - ${format(selectedRange.to, 'dd/MM/yyyy')}` : ''}
                                    </span>
                                    <i className="fas fa-calendar-alt"></i>
                                </button>
                                {isCalendarOpen && (
                                    <div style={{ position: 'absolute', zIndex: 10, backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                        <DayPicker
                                            mode="range"
                                            selected={selectedRange}
                                            onSelect={handleDateSelect}
                                            numberOfMonths={2}
                                            locale={fr}
                                            fromDate={new Date()}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Heure de départ *</label>
                                <div
                                    className={`choose-hour ${isStartTimeOpen ? 'open' : ''}`}
                                    ref={startTimeRef}
                                    onClick={() => setIsStartTimeOpen(!isStartTimeOpen)}
                                >
                                    <div className="choose-hour-select">
                                        <div className="selected">
                                            <span>{startTime}</span>
                                            <i className="fas fa-chevron-down" style={{ marginLeft: '10px', fontSize: '0.8rem' }}></i>
                                        </div>
                                    </div>
                                    {isStartTimeOpen && (
                                        <ul className="options">
                                            {timeSlots.map((hour) => (
                                                <li key={hour} onClick={(e) => { e.stopPropagation(); handleStartTimeSelect(hour); }}>
                                                    {hour}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Heure de retour *</label>
                                <div
                                    className={`choose-hour ${isReturnTimeOpen ? 'open' : ''}`}
                                    ref={returnTimeRef}
                                    onClick={() => setIsReturnTimeOpen(!isReturnTimeOpen)}
                                >
                                    <div className="choose-hour-select">
                                        <div className="selected">
                                            <span>{returnTime}</span>
                                            <i className="fas fa-chevron-down" style={{ marginLeft: '10px', fontSize: '0.8rem' }}></i>
                                        </div>
                                    </div>
                                    {isReturnTimeOpen && (
                                        <ul className="options">
                                            {timeSlots.map((hour) => (
                                                <li key={hour} onClick={(e) => { e.stopPropagation(); handleReturnTimeSelect(hour); }}>
                                                    {hour}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
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
                                    defaultValue={searchParams.location as string}
                                    required
                                >
                                    <option value="">Sélectionnez un lieu</option>
                                    {locations.map((loc) => (
                                        <option key={loc.id} value={loc.id}>
                                            {loc.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="returnLocationId">Lieu de retour *</label>
                                <select
                                    id="returnLocationId"
                                    name="returnLocationId"
                                    defaultValue={searchParams.returnLocation as string}
                                    required
                                >
                                    <option value="">Sélectionnez un lieu</option>
                                    {locations.map((loc) => (
                                        <option key={loc.id} value={loc.id}>
                                            {loc.nom}
                                        </option>
                                    ))}
                                </select>
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

                    {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

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
