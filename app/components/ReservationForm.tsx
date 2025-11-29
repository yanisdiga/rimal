// Fichier : app/components/ReservationForm.tsx

"use client";

import React, { useState, useRef, useEffect } from 'react';
// Importe le type de votre BDD
import { Location } from '@prisma/client';
// Imports pour le calendrier
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Import du CSS pour le calendrier (vous pouvez le mettre dans globals.css)
import 'react-day-picker/dist/style.css';

// --- (Début) Hook pour gérer les clics en dehors ---
// (Mis ici pour garder le fichier autonome)
function useClickOutside(ref: React.RefObject<any>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Ne fait rien si on clique sur l'élément de réf ou ses enfants
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(); // Appelle la fonction de fermeture
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
// --- (Fin) Hook ---

// Définition des props que le composant reçoit de la page
interface ReservationFormProps {
  locations: Location[];
  hours: string[];
}

export function ReservationForm({ locations, hours }: ReservationFormProps) {

  // --- États (States) ---
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  // 👇 CORRECTION ICI : Initialisation sûre de l'état
  // On type l'état comme 'Location | undefined' et on utilise locations[0]
  // (qui sera 'undefined' si 'locations' est un tableau vide)
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(locations[0]);

  const [isReturnLocationOpen, setIsReturnLocationOpen] = useState(false);
  const [selectedReturnLocation, setSelectedReturnLocation] = useState<Location | undefined>();

  // (On suppose que 'hours' ne sera jamais un tableau vide)
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(hours[0]);

  const [isReturnTimeOpen, setIsReturnTimeOpen] = useState(false);
  const [selectedReturnTime, setSelectedReturnTime] = useState(hours[0]);

  // --- Références (Refs) ---
  const calendarRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const returnLocationRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<HTMLDivElement>(null);
  const returnTimeRef = useRef<HTMLDivElement>(null);

  // --- Effets (Effects) ---
  // On attache les hooks de clic extérieur à chaque menu
  useClickOutside(calendarRef, () => setIsCalendarOpen(false));
  useClickOutside(locationRef, () => setIsLocationOpen(false));
  useClickOutside(returnLocationRef, () => setIsReturnLocationOpen(false));
  useClickOutside(startTimeRef, () => setIsStartTimeOpen(false));
  useClickOutside(returnTimeRef, () => setIsReturnTimeOpen(false));

  // --- Fonctions (Handlers) ---
  const handleDateSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
    if (range?.from && range?.to) {
      setIsCalendarOpen(false); // Ferme si la sélection est complète
    }
  };
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsLocationOpen(false);
  };
  const handleReturnLocationSelect = (location: Location) => {
    // Si le lieu de retour choisi est le MÊME que le lieu de départ...
    if (location.id === selectedLocation?.id) {
      // ...on réinitialise le lieu de retour (on le remet à 'undefined').
      setSelectedReturnLocation(undefined);
    } else {
      // ...sinon, on le définit.
      setSelectedReturnLocation(location);
    }

    // On ferme le menu déroulant dans tous les cas
    setIsReturnLocationOpen(false);
  };
  const handleStartTimeSelect = (hour: string) => {
    setSelectedStartTime(hour);
    setIsStartTimeOpen(false);
  };
  const handleReturnTimeSelect = (hour: string) => {
    setSelectedReturnTime(hour);
    setIsReturnTimeOpen(false);
  };

  // --- Rendu JSX ---
  return (
    <div className="reservations">
      {/* 👇 VOTRE CODE EST ICI - Remplacez ce bloc entier 👇 */}
      <div className="locations-container">

        {/* === COLONNE 1: RETRAIT === */}
        <div className="location-column">
          <span>
            {selectedReturnLocation ? 'Retrait' : 'Retrait et retour'}
          </span>
          <div
            className={`choose-location ${isLocationOpen ? 'open' : ''}`}
            ref={locationRef}
            onClick={() => setIsLocationOpen(!isLocationOpen)}
          >
            <i className="fas fa-map-marker-alt"></i>
            <div className="choose-location-select">
              <div className="selected">
                <span>
                  {selectedLocation ? selectedLocation.nom : 'Choisir un lieu'}
                </span>
                <svg viewBox="-19.04 0 75.804 75.804" className={isLocationOpen ? 'rotated' : ''}>
                  {/* ... svg path ... */}
                </svg>
              </div>
            </div>
            {isLocationOpen && (
              <ul className="options">
                {locations.map((loc) => (
                  <li
                    key={loc.id}
                    onClick={() => handleLocationSelect(loc)}
                  >
                    {loc.nom}
                  </li>
                ))}
              </ul>
            )}
            <input type="hidden" name="location" value={selectedLocation?.id || ''} />
          </div>
        </div>

        {/* === COLONNE 2: RETOUR (C'EST LE BLOC QUE VOUS AVIEZ SUPPRIMÉ) === */}
        <div className="location-column return-column">
          {/* Le label "Retour" (vide ou non) pour l'alignement */}
          <span>
            {selectedReturnLocation ? 'Retour' : <span>&nbsp;</span>}
          </span>

          {/* Le bouton "+ Lieu de retour différent" */}
          <div
            className={`choose-location return-location ${isReturnLocationOpen ? 'open' : ''}`}
            ref={returnLocationRef}
            onClick={() => setIsReturnLocationOpen(!isReturnLocationOpen)}
          >
            <i className="fa-solid fa-plus"></i>
            <div className="choose-location-select">
              <div className="selected">
                <span>
                  {selectedReturnLocation ? selectedReturnLocation.nom : 'Lieu de retour différent'}
                </span>
              </div>
            </div>
            {isReturnLocationOpen && (
              <ul className="options">
                {locations.map((loc) => (
                  <li
                    key={loc.id}
                    onClick={() => handleReturnLocationSelect(loc)}
                  >
                    {loc.nom}
                  </li>
                ))}
              </ul>
            )}
            <input type="hidden" name="return-location" value={selectedReturnLocation?.id || selectedLocation?.id || ''} />
          </div>
        </div>
        {/* === FIN DU BLOC MANQUANT === */}

      </div>

      {/* === Conteneur des Dates === */}
      <div className="dates-validation-container">
        <div className="dates-container" ref={calendarRef}>

          {/* Bouton Date de départ */}
          <div className="start-date-container">
            <span>Date et heure de départ</span>
            <div className="button-start">
              <button
                id="start-date"
                className="choose-date"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              >
                <i className="fas fa-calendar-alt"></i>
                <span>
                  {selectedRange?.from ? format(selectedRange.from, 'dd/MM/yyyy') : 'Date de départ'}
                </span>
              </button>

              {/* Menu Heure de départ */}
              <div
                className={`choose-hour ${isStartTimeOpen ? 'open' : ''}`}
                ref={startTimeRef}
                onClick={() => setIsStartTimeOpen(!isStartTimeOpen)}
              >
                <div className="choose-hour-select">
                  <div className="selected">
                    <span>{selectedStartTime}</span>
                    <svg>{/* ... */}</svg>
                  </div>
                </div>
                {isStartTimeOpen && (
                  <ul className="options">
                    {hours.map((hour) => (
                      <li key={hour} onClick={() => handleStartTimeSelect(hour)}>
                        {hour}
                      </li>
                    ))}
                  </ul>
                )}
                <input type="hidden" name="start-time" value={selectedStartTime} />
              </div>
            </div>
          </div>

          {/* Bouton Date de retour */}
          <div className="end-date-container">
            <span>Date et heure de retour</span>
            <div className="button-end">
              <button
                id="end-date"
                className="choose-date"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              >
                <i className="fas fa-calendar-alt"></i>
                <span>
                  {selectedRange?.to ? format(selectedRange.to, 'dd/MM/yyyy') : 'Date de retour'}
                </span>
              </button>

              {/* Menu Heure de retour */}
              <div
                className={`choose-hour return-hour ${isReturnTimeOpen ? 'open' : ''}`}
                ref={returnTimeRef}
                onClick={() => setIsReturnTimeOpen(!isReturnTimeOpen)}
              >
                <div className="choose-hour-select">
                  <div className="selected">
                    <span>{selectedReturnTime}</span>
                    <svg>{/* ... */}</svg>
                  </div>
                </div>
                {isReturnTimeOpen && (
                  <ul className="options">
                    {hours.map((hour) => (
                      <li key={hour} onClick={() => handleReturnTimeSelect(hour)}>
                        {hour}
                      </li>
                    ))}
                  </ul>
                )}
                <input type="hidden" name="return-time" value={selectedReturnTime} />
              </div>
            </div>
          </div>

          {/* LE CALENDRIER (anciennement flatpickr) */}
          {isCalendarOpen && (
            <div style={{ position: 'absolute', top: '100%', zIndex: 100, background: 'white', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={handleDateSelect}
                numberOfMonths={2}
                locale={fr}
                fromDate={new Date()} // Remplace minDate: "today"
              />
            </div>
          )}
        </div>
        <button className="validate-button">Rechercher</button>
      </div>
    </div>
  );
}