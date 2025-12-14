"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Location } from '@prisma/client';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { DateRangeSelector } from './DateRangeSelector';

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

interface ReservationFormProps {
  locations: Location[];
  hours: string[];
}

export function ReservationForm({ locations, hours }: ReservationFormProps) {

  // --- États (States) ---
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);

  const [isReturnLocationOpen, setIsReturnLocationOpen] = useState(false);
  const [selectedReturnLocation, setSelectedReturnLocation] = useState<Location | undefined>();

  const [selectedStartTime, setSelectedStartTime] = useState(hours[0]);
  const [selectedReturnTime, setSelectedReturnTime] = useState(hours[0]);
  const [isReturnLocationDifferent, setIsReturnLocationDifferent] = useState(false);

  // Custom Location State
  const [isCustomLocationMode, setIsCustomLocationMode] = useState(false);
  const [customLocationText, setCustomLocationText] = useState('');

  const [isCustomReturnLocationMode, setIsCustomReturnLocationMode] = useState(false);
  const [customReturnLocationText, setCustomReturnLocationText] = useState('');

  // --- Références (Refs) ---
  const locationRef = useRef<HTMLDivElement>(null);
  const returnLocationRef = useRef<HTMLDivElement>(null);

  // --- Effets (Effects) ---
  useClickOutside(locationRef, () => setIsLocationOpen(false));
  useClickOutside(returnLocationRef, () => setIsReturnLocationOpen(false));

  // --- Fonctions (Handlers) ---
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsLocationOpen(false);
  };
  const handleReturnLocationSelect = (location: Location) => {
    if (location.id === selectedLocation?.id) {
      setSelectedReturnLocation(undefined);
      setIsReturnLocationDifferent(false);
    } else {
      setSelectedReturnLocation(location);
      setIsReturnLocationDifferent(true);
    }
    setIsReturnLocationOpen(false);
  };

  const router = useRouter();

  const handleSearch = () => {
    const query: Record<string, string> = {};

    if (isCustomLocationMode && customLocationText) {
      query.customLocation = customLocationText;
    } else if (selectedLocation?.id) {
      query.location = selectedLocation.id.toString();
    }

    if (isCustomReturnLocationMode && customReturnLocationText) {
      query.customReturnLocation = customReturnLocationText;
    } else {
      query.returnLocation = (selectedReturnLocation?.id || selectedLocation?.id || '').toString();
    }

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

    const queryString = new URLSearchParams(query).toString();
    router.push(`/reservation?${queryString}`);
  };

  return (
    <div className="reservations">
      <div className="locations-container">

        {/* === COLONNE 1: RETRAIT === */}
        <div className="location-column">
          <span>
            {selectedReturnLocation ? 'Retrait' : 'Retrait et retour'}
          </span>
          <div
            className={`choose-location ${isLocationOpen ? 'open' : ''}`}
            ref={locationRef}
            onClick={() => !isCustomLocationMode && setIsLocationOpen(!isLocationOpen)}
          >

            {isCustomLocationMode ? (
              <div className="custom-location-input-wrapper">
                <input
                  type="text"
                  placeholder="Entrez l'adresse de livraison..."
                  value={customLocationText}
                  onChange={(e) => setCustomLocationText(e.target.value)}
                  autoFocus
                  className="custom-input-field"
                />
                <i className="fas fa-times custom-input-close" onClick={(e) => { e.stopPropagation(); setIsCustomLocationMode(false); setSelectedLocation(locations[0]); }}></i>
              </div>
            ) : (
              <>
                <i className="fas fa-map-marker-alt"></i>
                <div className="choose-location-select">
                  <div className="selected">
                    <span>
                      {selectedLocation ? selectedLocation.nom : 'Choisir un lieu'}
                    </span>
                    <svg viewBox="-19.04 0 75.804 75.804" className={isLocationOpen ? 'rotated' : ''}>
                      <path className="location-svg-path" d="M37.902,30.566L1.876,5.32c-1.425-0.992-2.316-2.583-2.385-4.32c-0.063-1.736,0.697-3.391,2.039-4.481L36.883-26.68  c2.197-1.777,5.361-1.464,7.132,0.735c0.686,0.854,1.066,1.914,1.066,3.007v54.265c0,2.833-2.296,5.129-5.129,5.129  C39.297,36.456,38.583,36.237,37.902,30.566z" />
                    </svg>
                  </div>
                </div>
              </>
            )}

            {isLocationOpen && !isCustomLocationMode && (
              <ul className="options">
                {locations.map((loc) => (
                  <li
                    key={loc.id}
                    onClick={() => handleLocationSelect(loc)}
                  >
                    {loc.nom}
                  </li>
                ))}
                <li onClick={() => { setIsCustomLocationMode(true); setIsLocationOpen(false); setSelectedLocation(undefined); }} className="option-custom">
                  Autre / Adresse Spécifique
                </li>
              </ul>
            )}
            <input type="hidden" name="location" value={selectedLocation?.id || ''} />
          </div>
        </div>

        {/* === COLONNE 2: RETOUR === */}
        <div className={`location-column return-column ${(selectedReturnLocation || isCustomReturnLocationMode) ? 'active' : ''}`}>
          <span>
            {selectedReturnLocation || isCustomReturnLocationMode ? 'Retour' : <span>&nbsp;</span>}
          </span>
          <div
            className={`choose-location return-location ${isReturnLocationOpen ? 'open' : ''} ${isReturnLocationDifferent ? 'different' : ''}`}
            ref={returnLocationRef}
            onClick={() => !isCustomReturnLocationMode && setIsReturnLocationOpen(!isReturnLocationOpen)}
          >
            {isCustomReturnLocationMode ? (
              <div className="custom-location-input-wrapper">
                <input
                  type="text"
                  placeholder="Adresse de retour..."
                  value={customReturnLocationText}
                  onChange={(e) => setCustomReturnLocationText(e.target.value)}
                  autoFocus
                  className="custom-input-field"
                />
                <i className="fas fa-times custom-input-close" onClick={(e) => { e.stopPropagation(); setIsCustomReturnLocationMode(false); setSelectedReturnLocation(undefined); }}></i>
              </div>
            ) : (
              <>
                <i className="fa-solid fa-plus"></i>
                <div className="choose-location-select">
                  <div className="selected">
                    <span>
                      {selectedReturnLocation ? selectedReturnLocation.nom : 'Lieu de retour différent'}
                    </span>
                  </div>
                </div>
              </>
            )}

            {isReturnLocationOpen && !isCustomReturnLocationMode && (
              <ul className="options">
                {locations.map((loc) => (
                  <li
                    key={loc.id}
                    onClick={() => handleReturnLocationSelect(loc)}
                  >
                    {loc.nom}
                  </li>
                ))}
                <li onClick={() => { setIsCustomReturnLocationMode(true); setIsReturnLocationOpen(false); setSelectedReturnLocation(undefined); }} className="option-custom">
                  Autre / Adresse Spécifique
                </li>
              </ul>
            )}
            <input type="hidden" name="return-location" value={selectedReturnLocation?.id || selectedLocation?.id || ''} />
          </div>
        </div>
      </div>

      <div className="dates-validation-container">

        {/* NEW REUSABLE DATE SELECTOR */}
        <DateRangeSelector
          startDate={selectedRange?.from}
          endDate={selectedRange?.to}
          onDateChange={setSelectedRange}
          startTime={selectedStartTime}
          returnTime={selectedReturnTime}
          onStartTimeChange={setSelectedStartTime}
          onReturnTimeChange={setSelectedReturnTime}
          hours={hours}
        />

        <button className="validate-button" onClick={handleSearch}>Rechercher</button>
      </div>
    </div >
  );
}