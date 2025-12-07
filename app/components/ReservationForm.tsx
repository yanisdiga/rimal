// Fichier : app/components/ReservationForm.tsx

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);

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
  const [isReturnLocationDifferent, setIsReturnLocationDifferent] = useState(false);

  // --- Références (Refs) ---
  const calendarRef = useRef<HTMLDivElement>(null);
  const startCalendarRef = useRef<HTMLDivElement>(null);
  const endCalendarRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const returnLocationRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<HTMLDivElement>(null);
  const returnTimeRef = useRef<HTMLDivElement>(null);

  // --- Effets (Effects) ---
  // On attache les hooks de clic extérieur à chaque menu
  useClickOutside(calendarRef, () => setIsCalendarOpen(false));
  useClickOutside(startCalendarRef, () => setIsStartCalendarOpen(false));
  useClickOutside(endCalendarRef, () => setIsEndCalendarOpen(false));
  useClickOutside(locationRef, () => setIsLocationOpen(false));
  useClickOutside(returnLocationRef, () => setIsReturnLocationOpen(false));
  useClickOutside(startTimeRef, () => setIsStartTimeOpen(false));
  useClickOutside(returnTimeRef, () => setIsReturnTimeOpen(false));

  // --- Fonctions (Handlers) ---
  const handleDateSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
    if (range?.from && range?.to) {
      setIsCalendarOpen(false); // Ferme si la sélection est complète
      setIsStartCalendarOpen(false);
      setIsEndCalendarOpen(false);
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
      setIsReturnLocationDifferent(false);
    } else {
      // ...sinon, on le définit.
      setSelectedReturnLocation(location);
      setIsReturnLocationDifferent(true);
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

  const router = useRouter();

  const handleSearch = () => {
    const query: Record<string, string> = {};

    if (selectedLocation?.id) {
      query.location = selectedLocation.id.toString();
    }
    // If return location is not explicitly set, it defaults to the pickup location
    query.returnLocation = (selectedReturnLocation?.id || selectedLocation?.id || '').toString();

    if (selectedRange?.from) {
      query.startDate = format(selectedRange.from, 'yyyy-MM-dd');
    }
    if (selectedRange?.to) {
      query.endDate = format(selectedRange.to, 'yyyy-MM-dd');
    }

    if (selectedStartTime) {
      query.startTime = selectedStartTime;
    }
    if (selectedReturnTime) {
      query.returnTime = selectedReturnTime;
    }

    // Construct the query string
    const queryString = new URLSearchParams(query).toString();
    router.push(`/reservation?${queryString}`);
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
            className={`choose-location return-location ${isReturnLocationOpen ? 'open' : ''} ${isReturnLocationDifferent ? 'different' : ''}`}
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
                className={`choose-date ${isStartCalendarOpen ? 'open' : ''}`}
                onClick={() => {
                  setIsCalendarOpen(true);
                  setIsStartCalendarOpen(true);
                  setIsEndCalendarOpen(false);
                }}
              >
                <i className="fas fa-calendar-alt"></i>
                <span>
                  {selectedRange?.from ? format(selectedRange.from, 'dd/MM/yyyy') : ''}
                </span>
              </button>

              {/* Menu Heure de départ */}
              <div
                className={`choose-hour ${isStartTimeOpen ? 'open' : ''}`}
                ref={startTimeRef}
                onClick={() => {
                  setIsStartTimeOpen(!isStartTimeOpen);
                  setIsCalendarOpen(false);
                  setIsStartCalendarOpen(false);
                  setIsEndCalendarOpen(false);
                }}
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
                      <li key={hour} onClick={() => {
                        handleStartTimeSelect(hour);
                      }}>
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
                className={`choose-date ${isEndCalendarOpen ? 'open' : ''}`}
                onClick={() => {
                  setIsCalendarOpen(true);
                  setIsEndCalendarOpen(true);
                  setIsStartCalendarOpen(false);
                }}
              >
                <i className="fas fa-calendar-alt"></i>
                <span>
                  {selectedRange?.to ? format(selectedRange.to, 'dd/MM/yyyy') : ''}
                </span>
              </button>

              {/* Menu Heure de retour */}
              <div
                className={`choose-hour return-hour ${isReturnTimeOpen ? 'open' : ''}`}
                ref={returnTimeRef}
                onClick={() => {
                  setIsReturnTimeOpen(!isReturnTimeOpen);
                  setIsCalendarOpen(false);
                  setIsStartCalendarOpen(false);
                  setIsEndCalendarOpen(false);
                }
                }
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
            <div className="calendar-container">
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={(range, selectedDay) => {
                  // Logique personnalisée selon l'input actif
                  if (isStartCalendarOpen) {
                    // Si on choisit la date de départ, on force la date de fin à undefined
                    // pour obliger l'utilisateur à faire un 2ème clic pour la fin (même si c'est le même jour)

                    // IMPORTANT: On utilise 'selectedDay' (le jour cliqué) comme début de range
                    // et on ignore 'range' (qui pourrait être une fusion avec l'ancienne sélection).
                    // Cela garantit que si l'utilisateur reclique pour changer le début, 
                    // l'ancienne range est effacée.
                    setSelectedRange({ from: selectedDay, to: undefined });

                    setIsStartCalendarOpen(false);
                    setIsEndCalendarOpen(true);
                    setIsCalendarOpen(true); // On maintient ouvert
                  } else {
                    // Sinon (mode date de fin ou défaut), on accepte la range telle quelle
                    setSelectedRange(range);
                    if (range?.from && range?.to) {
                      setIsCalendarOpen(false);
                      setIsStartCalendarOpen(false);
                      setIsEndCalendarOpen(false);
                    }
                  }
                }}
                numberOfMonths={2}
                locale={fr}
                disabled={{ before: new Date() }}
              />
            </div>
          )}
        </div>
        <button className="validate-button" onClick={handleSearch}>Rechercher</button>
      </div>
    </div >
  );
}