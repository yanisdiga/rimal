// Fichier : app/components/NavbarAndMenu.tsx

"use client"; // Obligatoire pour les 'useState' et 'onClick'

import React, { useState, useEffect } from 'react';
// Importe le type de données que Prisma nous donne
import { ModeleVoiture } from '@prisma/client';

// 1. Définir les "props" que ce composant reçoit
// Il a besoin de la liste des voitures (récupérée par le serveur)
interface NavbarProps {
  voitures: ModeleVoiture[];
  // Vous pourriez aussi passer les localisations en props si elles deviennent dynamiques
  // localisations: Location[];
}

export function NavbarAndMenu({ voitures }: NavbarProps) {

  // 2. Remplacer les querySelector par des états React
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('vehicules'); // 'vehicules' est l'onglet par défaut

  // 3. Remplacer les addEventListener par des fonctions
  const openMenu = () => {
    setIsMenuOpen(true);
  };
  const closeMenu = () => setIsMenuOpen(false);

  const selectTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (isMenuOpen) {
      // Quand le menu s'ouvre, bloque le scroll du body
      document.body.classList.add('no-scroll');
    } else {
      // Quand le menu se ferme, ré-autorise le scroll
      document.body.classList.remove('no-scroll');
    }

    // Fonction de "nettoyage" :
    // S'assure de retirer la classe si le composant est détruit
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]); // On surveille la variable 'isMenuOpen'

  function toSentenceCase(str: string): string {
    if (!str) return ''; // Gère les cas où la chaîne est vide

    const firstLetter = str.charAt(0).toUpperCase();
    const rest = str.slice(1).toLowerCase();

    return firstLetter + rest;
  }

  return (
    <>
      {/* ================================================= */}
      {/* 1. La Navbar (le hamburger et le logo) */}
      {/* ================================================= */}
      <nav className="navbar">
        <div className="hamburger" onClick={openMenu}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M4 18L20 18" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round"></path>
              <path d="M4 12L20 12" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round"></path>
              <path d="M4 6L20 6" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round"></path>
            </g>
          </svg>
          <span>Menu</span>
        </div>
        <div className="logo">
          <a href="/">Rimal</a>
        </div>
      </nav>

      {/* ================================================= */}
      {/* 2. Le Menu (l'overlay complet) */}
      {/* ================================================= */}
      <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="menu-overlay">

          {/* PANNEAU DE GAUCHE (LES ONGLETS) */}
          <div className="menu-overlay-left" id="menu">
            <div className="items">

              <a
                href="#"
                className={activeTab === 'vehicules' ? 'selected' : ''}
                onClick={(e) => { e.preventDefault(); selectTab('vehicules'); }}
              >
                <span>Nos véhicules</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="18px" viewBox="0 0 32 32" version="1.1">
                  <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z" />
                </svg>
              </a>

              <a
                href="#"
                className={activeTab === 'localisations' ? 'selected' : ''}
                onClick={(e) => { e.preventDefault(); selectTab('localisations'); }}
              >
                <span>Nos localisations</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="18px" viewBox="0 0 32 32" version="1.1">
                  <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z" />
                </svg>
              </a>

              {/* Vos autres liens (Réserv, Agence...) vont ici */}
            </div>
          </div>

          {/* PANNEAU DE DROITE (LE CONTENU DES ONGLETS) */}
          <div className="menu-overlay-right">

            {/* 4. Remplacer le fetch() et innerHTML par un .map() */}
            <div className={`vehicules-items right-menu-items ${activeTab === 'vehicules' && isMenuOpen ? 'active' : ''}`}>
              {voitures.map((car) => (
                <div key={car.id} className="vehicule-item item">
                  <span className="carName">{car.nom}</span>
                  <img src={car.imageUrl || undefined} alt={car.nom} />
                  <div className="carInfo">
                    <span>{toSentenceCase(car.transmission)}</span>
                    <span>{toSentenceCase(car.fuelType)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Ce panneau était statique dans votre JS/HTML, on le garde statique */}
            <div className={`localisations-items right-menu-items ${activeTab === 'localisations' && isMenuOpen ? 'active' : ''}`}>
              <div className="localisation-item item">
                <span className="locName">Aéroport Marrakech-Menara</span>
                <img className="locImg" src="https://aeroport-marrakech.com/wp-content/uploads/2018/12/25.jpg" alt="Aéroport" />
                <div className="locInfo">
                  <span>50DH</span>
                </div>
              </div>
              <div className="localisation-item item">
                <span className="locName">Place Jamaa el Fna</span>
                <img className="locImg" src="https://dunesdeserts.com/wp-content/uploads/2019/01/Jmaalefna.jpg" alt="Jamaa el Fna" />
                <div className="locInfo">
                  <span>Sans frais</span>
                </div>
              </div>
              <div className="localisation-item item">
                <span className="locName">Palmeraie</span>
                <img className="locImg" src="https://media.istockphoto.com/id/137855633/fr/photo/hauts-palmiers-marocaine-flags-ligne-approche-et-dun-minaret-de-la-mosqu%C3%A9e.jpg?s=612x612&w=0&k=20&c=utuIlJWtL8_6D8V-FKRvy8NWXa7YiWHjcbfieCRrI3k=" alt="Palmeraie" />
                <div className="locInfo">
                  <span>Sans frais</span>
                </div>
              </div>
            </div>
          </div>

          <button className="close-button" onClick={closeMenu}>
            <span>X</span>
          </button>
        </div>
      </div>
    </>
  );
}